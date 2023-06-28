import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../Auth/AuthProvider';
import { HiOutlinePlus } from 'react-icons/hi';
import { string, object, number, array } from 'yup';
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Formik, FormikValues } from 'formik';

import { AutoComplete } from '../AutoComplete';
import { FieldControl } from '../FieldControl';
import { WorkExperience } from './WorkExperience';
import { GoogleProfileData } from '@/src/types/Auth';
import { FormStep, FormStepper } from './FormStepper';
import { SimplworkClient } from '@/src/utils/simplwork';
import { StepProgressHeader } from './StepProgressHeader';
import { CommuteCheckBoxButton, commuteTypes } from './CommuteCheckBox';
import { CandiatePostRequest, CandidateLocation, CandidateMaxTravelTimes, CandidateWorkHistory } from '@/src/types/api/candidate';

type ValueTypes = {
	firstName: string;
	lastName: string;
	age: number | string;
	gender: string;
	phoneNumber: string;
	maximumHours: number | string;
	commuteTypes: string[];
	maxTravelTimes: CandidateMaxTravelTimes;
	workHistory: CandidateWorkHistory[];
};

const initialValues: ValueTypes = {
	firstName: '',
	lastName: '',
	gender: '',
	age: '',
	phoneNumber: '',
	maximumHours: '',
	commuteTypes: [],
	maxTravelTimes: { WALK: 20, BIKE: 30, CAR: 90, PUBLIC_TRANSIT: 90 },
	workHistory: [],
	//{ positionTitle: '', companyName: '', details: '', startDate: '', endDate: '' }
};

const validationSchemaStepOne = object().shape({
	firstName: string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
	lastName: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
	age: number().min(14, 'You must be at least 14 years').max(60, 'You must be at most 60 years').required('Age is required'),
	gender: string().required('Gender is required'),
	phoneNumber: string()
		.matches(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/, 'Invalid format ex. 123-456-7890')
		.required('A phone number is required'),
});

const validationSchemaStepTwo = object().shape({
	homeAddress: string(),
	maximumHours: number().min(0, 'Please enter a valid hour').max(168, 'Please enter a valid hour').required('You must enter this field.'),
});

const validationSchemaStepThree = object().shape({
	workHistory: array().of(
		object().shape({
			positionTitle: string().required(),
			companyName: string().required(),
			details: string().required(),
			startDate: string().required(),
			endDate: string().required(),
		})
	),
});

const validationSchema = [validationSchemaStepOne, validationSchemaStepTwo, validationSchemaStepThree];

type SignUpFlowProps = { userData: GoogleProfileData };

export const SignUpFlow = ({ userData }: SignUpFlowProps) => {
	const router = useRouter();
	const { setUser } = useAuth();

	if (!userData.credential) router.push('/signup');

	const [step, setStep] = useState<number>(0);
	const [location, setLocation] = useState<CandidateLocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const updateStep = (step: number) => setStep(step);
	const updateLocation = (data: CandidateLocation) => setLocation(data);

	const onSubmit = async ({ maximumHours, maxTravelTimes, age, gender, phoneNumber, firstName, lastName }: FormikValues) => {
		if (step === 1) {
			const requestBody: CandiatePostRequest = {
				candidateProfile: {
					workHistory: [],
					minimumPay: 0,
					maximumHours,
					location,
					availability: {
						SUNDAY: [{ startTime: 0, endTime: 900 }],
						MONDAY: [{ startTime: 0, endTime: 900 }],
						TUESDAY: [{ startTime: 0, endTime: 900 }],
						WEDNESDAY: [{ startTime: 0, endTime: 900 }],
						THURSDAY: [{ startTime: 0, endTime: 900 }],
						FRIDAY: [{ startTime: 0, endTime: 900 }],
						SATURDAY: [{ startTime: 0, endTime: 900 }],
					},
					maxLiftWeight: 0,
					maxTravelTimes,
					autoMatch: true,
				},
				user: {
					email: userData.email,
					age,
					gender: gender.toUpperCase(),
					phoneNumber,
					name: `${firstName} ${lastName}`,
				},
			};
			console.log(JSON.stringify(requestBody, null, 2));
			await SimplworkClient(userData.credential as string)
				.post('candidate', JSON.stringify(requestBody))
				.then((res: any) => setUser(userData.credential))
				.catch((err: any) => {
					console.log('error', err);
				});
		}
		if (step === 2) {
			router.push('/');
		} else {
			setStep((step) => step + 1);
		}
	};

	return (
		<div className='flex w-full h-screen bg-white p-5'>
			<div className='bg-gray-100 titems-start rounded-xl w-1/3 min-w-[450px] px-7 py-10 overflow-hidden hidden md:block'>
				<div className='pb-8'>
					<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
				</div>
				<div className='flex flex-col gap-6'>
					<StepProgressHeader
						name='Create Profile'
						description='Please select the account type that you wish to create'
						stepId={0}
						currStep={step}
					/>
					<StepProgressHeader name='Add Availability' description='Please add your work availability' stepId={1} currStep={step} />
					<StepProgressHeader
						name='Add Work Experience'
						description='Please select the account type that you wish to create'
						stepId={2}
						currStep={step}
					/>
					{/* {step} */}
				</div>
			</div>
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>
				<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)} validationSchema={validationSchema[step]}>
					{({ values, setFieldValue }) => (
						<FormStepper step={step} updateStep={updateStep}>
							<FormStep title='Create Profile' subtitle='Enter your details to create a profile'>
								<FieldControl name='firstName' label='First name' type='fname' />
								<FieldControl name='lastName' label='Last name' type='lname' />
								<div className='flex w-full gap-5'>
									<FieldControl name='age' label='Age' type='number' min={14} max={100} errorBelow />
									<FieldControl as='select' name='gender' label='Gender' type='' errorBelow>
										<option value='' label='Select a gender'></option>
										<option value='MALE'>Male</option>
										<option value='FEMALE'>Female</option>
										<option value='OTHER'>Other</option>
									</FieldControl>
								</div>
								<FieldControl name='phoneNumber' label='Phone Number' type='tel' placeholder='XXX-XXX-XXXX' />
							</FormStep>
							<FormStep title='Add Work Availability' subtitle='Enter your details to create a profile'>
								<AutoComplete update={updateLocation} credential={userData?.credential as string} />
								<div className='flex flex-col gap-1'>
									<div className='flex items-center'>
										<label className='font-medium leading-[35px]' htmlFor='maximumHours'>
											I can work up to
										</label>
										<div className='px-2 w-20'>
											<Field type='number' name='maximumHours' required className='inputStyle' />
										</div>
										<label className='font-medium leading-[35px]'>hours per week</label>
									</div>
									<ErrorMessage name='maximumHours' render={(msg: string) => <p className='text-sm font-medium text-red-700'>{msg}</p>} />
								</div>
								<h1 className='text-md pt-3 font-medium'>
									Select the modes of transport available to you and the maximum amount of time you are willing to commute each way
								</h1>
								<div className='flex gap-3 w-[450px] justify-between'>
									{Object.values(commuteTypes).map(({ value, text, icon }, index) => (
										<label key={`${text}${index}`}>
											<Field type='checkbox' name='commuteTypes' value={value} label={text} icon={icon} component={CommuteCheckBoxButton} />
										</label>
									))}
								</div>
								<FieldArray
									name='maxTravelTimes'
									render={(arrayHelpers: ArrayHelpers) => (
										<div className='flex flex-col gap-5'>
											{values.commuteTypes &&
												values.commuteTypes.length > 0 &&
												values.commuteTypes.map((commuteType, index) => (
													<div key={index}>
														<label className='flex flex-row gap-5 items-center w-full justify-between'>
															<span className='font-medium'>Maximum commute time by {commuteTypes[commuteType].text}</span>
															<Field type='number' min={0} name={`maxTravelTimes[${commuteType}]`} placeholder='min' className='inputStyle w-20' />
														</label>
													</div>
												))}
										</div>
									)}
								/>
								{/* {JSON.stringify(values, null, 2)} */}
							</FormStep>
							<FormStep title='Add Experience' subtitle='Add your work experience'>
								<WorkExperience values={values} />
								<button className='text-base bg-black p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-black/90 active:bg-black/80 disabled:bg-gray-300'>
									<span className='flex gap-2 items-center'>
										<HiOutlinePlus className='text-xl' />
										<p className='tracking-wide'>Add Work Experience</p>
									</span>
								</button>
								{/* {JSON.stringify(values, null, 2)} */}
							</FormStep>
						</FormStepper>
					)}
				</Formik>
			</div>
		</div>
	);
};
