import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getGoogleProfile, useAuth } from '../Auth/AuthProvider';
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik, FormikValues } from 'formik';

import { AutoComplete } from '../AutoComplete';
import { SimplworkApi } from '@/src/utils/simplwork';
import { StepProgressHeader } from './StepProgressHeader';
import { CommuteCheckBoxButton, commuteTypes } from './CommuteCheckBox';
import { CandiatePostRequest, CandidateLocation, CandidateMaxTravelTimes, CandidateWorkHistory } from '@/src/types/api/candidate';
import { SignUpExperienceForm } from '../SignUpExperienceForm';
import { StepHeader } from './StepHeader';
import { ProfileForm } from '../Formik/Forms/ProfileForm';
import { createCandidateRequestBody } from '@/src/utils/authHelpers';
import { profileValidationSchema, validationSchemaStepTwo, workHistoryValidationSchema } from '../Formik/FormValidation';

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

const validationSchema = [profileValidationSchema, validationSchemaStepTwo, workHistoryValidationSchema];

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
		console.log('val', step);
		console.log('val', values);
		if (step === 1) {
			const { email } = getGoogleProfile(credential);
			const tempLocation: CandidateLocation = {
				latitude: 43.676444420388805,
				longitude: -79.55569588996742,
				postalCode: 'M9R0B3',
			};
			const requestBody = createCandidateRequestBody(values, tempLocation, email);
			console.log(JSON.stringify(requestBody, null, 2));
			await SimplworkApi.post('candidate', JSON.stringify(requestBody))
				.then((res: any) => {
					signInUser(credential);
				})
				.catch((err: any) => {
					alert('There was an issue creating your account, Please try again.');
					resetSignUp();
				});
		} else if (step === 2) {
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
					<StepProgressHeader name='Add Availability' description='Please add your work availability' stepId={1} currStep={step} />
					<StepProgressHeader
						name='Add Work Experience'
						description='Please select the account type that you wish to create'
						stepId={2}
						currStep={step}
					/>
				</div>
			</div>
			{/* validationSchema={validationSchema[step]} */}
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>
				{step}
				{step < 2 ? (
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
									<div className='w-[450px] max-w-[450px]'>
										<StepHeader title='Add Work Availability' subtitle='Enter your details to create a profile' />
										<div className='flex flex-col gap-5'>
											{/* <AutoComplete update={updateLocation} credential={credential} /> */}
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

											<StepperButtons step={step} updateStep={updateStep} />
											{/* {JSON.stringify(values, null, 2)} */}
										</div>
									</div>
								)}
							</Form>
						)}
					</Formik>
				) : (
					<div className='w-[450px] max-w-[450px]'>
						<StepHeader title='Create Profile' subtitle='Enter your details to create a profile' />
						<SignUpExperienceForm />
						<div className='flex w-full pt-7 gap-3'>
							{step > 0 && (
								<button
									type='button'
									onClick={() => updateStep(step - 1)}
									className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
									Back
								</button>
							)}
							4
							<button
								onClick={() => router.push('/')}
								className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
								Continue
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const StepperButtons = ({ step, updateStep }: { step: number; updateStep: (arg: number) => void }) => {
	return (
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
