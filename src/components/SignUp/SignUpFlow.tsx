import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../Auth/AuthProvider';
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik, FormikValues } from 'formik';

import { AutoComplete } from '../AutoComplete';
import { SimplworkApi } from '@utils/simplwork';
import { StepProgressHeader } from './StepProgressHeader';
import { CommuteCheckBoxButton, commuteTypes } from './CommuteCheckBox';
import { CandaidateAvailibility, CandidateLocation, CandidateMaxTravelTimes, CandidateWorkHistory } from '@typings/api/candidate';
import { SignUpExperienceForm } from '../SignUpExperienceForm';
import { StepHeader } from './StepHeader';
import { ProfileForm } from '../Formik/Forms/ProfileForm';
import { createCandidateRequestBody } from '@utils/authHelpers';
import { profileValidationSchema, validationSchemaStepTwo, workHistoryValidationSchema } from '../Formik/FormValidation';
import { AvailabilityWidget, constructAvailabilityObject } from '../AvailabilityWidget';

export type ValueUserTypes = {
	fullName: string;
	age: number | string;
	gender: string;
	phoneNumber: string;
};

type ValueAvailabilityTypes = {
	maximumHours: number | string;
	commuteTypes: string[];
	maxTravelTimes: CandidateMaxTravelTimes;
	workHistory: CandidateWorkHistory[];
};

const initialValues: ValueUserTypes & ValueAvailabilityTypes = {
	fullName: '',
	gender: '',
	age: '',
	phoneNumber: '',
	maximumHours: '',
	commuteTypes: [],
	maxTravelTimes: { WALK: 20, BIKE: 30, CAR: 90, PUBLIC_TRANSIT: 90 },
	workHistory: [],
};

const validationSchema = [profileValidationSchema, null, validationSchemaStepTwo, workHistoryValidationSchema];

type SignUpFlowProps = { credential: string; resetSignUp?: () => void };

// const tempLocation: CandidateLocation = {
// 	latitude: 43.676444420388805,
// 	longitude: -79.55569588996742,
// 	postalCode: 'M9R0B3',
// };

export const SignUpFlow = ({ credential, resetSignUp }: SignUpFlowProps) => {
	const router = useRouter();
	const { user, signInUser } = useAuth();

	const [step, setStep] = useState<number>(0);
	const [location, setLocation] = useState<CandidateLocation>({ latitude: 0, longitude: 0, postalCode: '' });
	const [availability, setAvailability] = useState<CandaidateAvailibility>(constructAvailabilityObject());
	// update form step
	const updateStep = (step: number) => setStep(step);
	// callback to get location coordinates from autocomplete
	const updateLocation = (data: CandidateLocation) => setLocation(data);

	const onSubmit = async (values: FormikValues) => {
		if (step === 2) {
			const requestBody = createCandidateRequestBody(values, location, availability, user?.email as string);
			// console.log(JSON.stringify(requestBody, null, 2));
			await SimplworkApi.post('candidate', JSON.stringify(requestBody))
				.then((res: any) => {
					signInUser(credential);
				})
				.catch((err: any) => {
					alert('There was an issue creating your account, Please try again.');
					router.push('/');
				});
		} else if (step >= 3) {
			router.push('/');
		}
		setStep((step) => step + 1);
	};

	return (
		<div className='flex w-full h-screen bg-white p-5 over'>
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
					<StepProgressHeader name='Commute Preferences' description='Please add your work availability' stepId={1} currStep={step} />
					<StepProgressHeader name='Work Availability' description='Please add your work availability' stepId={2} currStep={step} />
					<StepProgressHeader
						name='Add Work Experience'
						description='Please select the account type that you wish to create'
						stepId={3}
						currStep={step}
					/>
				</div>
			</div>
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>
				{step < 3 ? (
					<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)} validationSchema={validationSchema[step]}>
						{({ values, setFieldValue }) => (
							<Form noValidate>
								{step === 0 && (
									<div className='w-[450px] max-w-[450px]'>
										<StepHeader title='Create Profile' subtitle='Enter your details to create a profile' />
										<ProfileForm />
										<StepperButtons step={step} updateStep={updateStep} />
									</div>
								)}
								{step === 1 && (
									<div className='w-[450px] max-w-[450px] flex flex-col gap-5'>
										<StepHeader title='Add Commute Preferences' subtitle='Enter your details to create a profile' />
										<AutoComplete update={updateLocation} />
										<div className='flex flex-col gap-5'>
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
										</div>

										<StepperButtons step={step} updateStep={updateStep} />
									</div>
								)}
								{step === 2 && (
									<div className='w-[450px] max-w-[450px] flex flex-col gap-5'>
										<StepHeader title='Add Work Availability' subtitle='Enter your details to create a profile' />
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
										<div className='w-full'>
											<h1 className='font-medium leading-[35px]'>Select the time segments that you are available to work.</h1>
											<AvailabilityWidget availability={availability} onChange={setAvailability} />
										</div>
										<StepperButtons step={step} updateStep={updateStep} />
									</div>
								)}
							</Form>
						)}
					</Formik>
				) : (
					<div className='w-[450px] max-w-[450px] flex flex-col gap-5'>
						<StepHeader title='Add Work Experience' subtitle='Enter your work experience' />
						<SignUpExperienceForm />
						<StepperButtons step={step} updateStep={updateStep} />
					</div>
				)}
			</div>
		</div>
	);
};

const StepperButtons = ({ step, updateStep }: { step: number; updateStep: (arg: number) => void }) => {
	return (
		<div className='flex w-full gap-3'>
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
	);
};

{
	/* <div className='flex flex-col gap-5'>
	<FieldControl name='fullName' label='Full name' type='text' />
	<div className='flex w-full gap-5'>
		<FieldControl name='age' label='Age' type='number' min={14} max={100} errorBelow />
		<GenderSelect />
	</div>
	<FieldControl name='phoneNumber' label='Phone Number' type='tel' placeholder='XXX-XXX-XXXX' />
	<StepperButtons step={step} updateStep={updateStep} />
</div>; */
}
