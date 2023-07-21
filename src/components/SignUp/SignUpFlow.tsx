import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getGoogleProfile, useAuth } from '../Auth/AuthProvider';
import { string, object, number, date } from 'yup';
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik, FormikValues } from 'formik';

import { AutoComplete } from '../AutoComplete';
import { FieldControl } from '../FieldControl';
import { Step, Stepper } from './FormStepper';
import { SimplworkApi } from '@/src/utils/simplwork';
import { StepProgressHeader } from './StepProgressHeader';
import { CommuteCheckBoxButton, commuteTypes } from './CommuteCheckBox';
import {
	CandaidateProfile,
	CandiatePostRequest,
	CandidateLocation,
	CandidateMaxTravelTimes,
	CandidateWorkHistory,
} from '@/src/types/api/candidate';
import { GenderSelect } from '../GenderSelect';
import { SignUpExperienceForm } from '../SignUpExperienceForm';

type ValueTypes = {
	fullName: string;
	age: number | string;
	gender: string;
	phoneNumber: string;
	maximumHours: number | string;
	commuteTypes: string[];
	maxTravelTimes: CandidateMaxTravelTimes;
	workHistory: CandidateWorkHistory[];
};

const initialValues: ValueTypes = {
	fullName: '',
	gender: '',
	age: '',
	phoneNumber: '',
	maximumHours: '',
	commuteTypes: [],
	maxTravelTimes: { WALK: 20, BIKE: 30, CAR: 90, PUBLIC_TRANSIT: 90 },
	workHistory: [],
};

export const profileValidationSchema = object().shape({
	fullName: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name is required'),
	age: number().min(14, 'You must be at least 14 years').max(60, 'You must be at most 60 years').required('Age is required'),
	gender: string().required('Gender is required'),
	phoneNumber: string()
		.matches(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/, 'Invalid format ex. 123-456-7890')
		.required('A phone number is required'),
});

const validationSchemaStepTwo = object().shape({
	maximumHours: number().min(0, 'Please enter a valid hour').max(168, 'Please enter a valid hour').required('You must enter this field.'),
});

export const workHistoryValidationSchema = object().shape({
	positionTitle: string().required('Position title is required.'),
	companyName: string().required('Compnay name is required.'),
	details: string().required('Position details is required.'),
	startDate: date(),
	endDate: date(),
});

const validationSchema = [profileValidationSchema, validationSchemaStepTwo, workHistoryValidationSchema];

const createCandidateRequestBody = (values: FormikValues, location: CandidateLocation, email: string) => {
	const candidateProfile: CandaidateProfile = {
		workHistory: [],
		minimumPay: 0,
		maximumHours: values.maximumHours,
		location,
		availability: {
			SUNDAY: [{ startTime: 0, endTime: 1439 }],
			MONDAY: [{ startTime: 0, endTime: 1439 }],
			TUESDAY: [{ startTime: 0, endTime: 1439 }],
			WEDNESDAY: [{ startTime: 0, endTime: 1439 }],
			THURSDAY: [{ startTime: 0, endTime: 1439 }],
			FRIDAY: [{ startTime: 0, endTime: 1439 }],
			SATURDAY: [{ startTime: 0, endTime: 1439 }],
		},
		maxLiftWeight: 0,
		maxTravelTimes: values.maxTravelTimes,
		autoMatch: true,
	};

	const user = {
		email: email,
		age: values.age,
		gender: values.gender.toUpperCase(),
		phoneNumber: values.phoneNumber,
		name: values.fullName,
	};

	return {
		candidateProfile: candidateProfile,
		user: user,
	};
};

type SignUpFlowProps = { credential: string; resetSignUp: () => void };

export const SignUpFlow = ({ credential, resetSignUp }: SignUpFlowProps) => {
	const router = useRouter();
	const { signInUser } = useAuth();

	if (!credential) router.push('/signup');

	const [step, setStep] = useState<number>(0);
	const [location, setLocation] = useState<CandidateLocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const updateStep = (step: number) => setStep(step);
	const updateLocation = (data: CandidateLocation) => setLocation(data);

	const onSubmit = async (values: FormikValues) => {
		if (step === 1) {
			const { email } = getGoogleProfile(credential);
			const requestBody: CandiatePostRequest = createCandidateRequestBody(values, location, email);
			// console.log(JSON.stringify(requestBody, null, 2));
			await SimplworkApi.post('candidate', JSON.stringify(requestBody))
				.then((res: any) => {
					signInUser(credential);
					setStep(2);
				})
				.catch((err: any) => {
					alert('There was an issue creating your account, Please try again.');
					console.log('error', err);
					resetSignUp();
				});
		} else if (step === 2) {
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
			{/* validationSchema={validationSchema[step]} */}
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>
				<Stepper step={step} updateStep={updateStep}>
					<Step title='Create Profile' subtitle='Enter your details to create a profile'>
						<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)}>
							{({ values, setFieldValue }) => (
								<Form className=''>
									<FieldControl name='fullName' label='Full name' type='text' />
									<div className='flex w-full gap-5'>
										<FieldControl name='age' label='Age' type='number' min={14} max={100} errorBelow />
										<GenderSelect />
									</div>
									<FieldControl name='phoneNumber' label='Phone Number' type='tel' placeholder='XXX-XXX-XXXX' />
									<div className='flex w-full pt-7 gap-3'>
										{step > 0 && (
											<button
												type='button'
												onClick={() => updateStep(step - 1)}
												className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
												Back
											</button>
										)}
										<button
											type='submit'
											className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
											Continue
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</Step>
					<Step title='Add Work Availability' subtitle='Enter your details to create a profile'>
						<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)}>
							{({ values, setFieldValue }) => (
								<Form>
									<AutoComplete update={updateLocation} credential={credential} />
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
								</Form>
							)}
						</Formik>
					</Step>
				</Stepper>
				{step == 2 && <SignUpExperienceForm />}
			</div>
		</div>
	);
};
