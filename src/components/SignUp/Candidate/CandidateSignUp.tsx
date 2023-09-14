import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../Auth/AuthProvider';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { AutoComplete } from '../../AutoComplete';
import { SimplworkApi } from '@utils/simplwork';
import { StepProgressHeaderObj } from '../StepProgressHeader';
import { StepHeader } from '../StepHeader';
import { ProfileForm } from '../../Formik/Forms/ProfileForm';
import { createCandidateRequestBody } from '@utils/authHelpers';
import { profileValidationSchema, validationSchemaStepTwo, workHistoryValidationSchema } from '../../Formik/FormValidation';
import { RegisterLayout } from '../RegisterLayout';
import { StepperButtons } from '../StepperButtons';
import { Step } from '../Step';
import { convertShiftsToAvailability, createAvailabilityObject } from '@components/AvailabilityWidget/logic';
import { AvailabilityEditSignUp } from '@components/AvailabilityWidget/AvailabilityEditSignUp';
import { CommuteSelect } from './CommuteSelect';
import { SignUpExperienceForm } from '@components/Dialogs/AddExperience/SignUpExperienceForm';

export type ValueUserTypes = {
	fullName: string;
	age: number | string;
	gender: string;
	phoneNumber: string;
};

type ValueAvailabilityTypes = {
	maximumHours: number | string;
	commuteTypes: string[];
	maxTravelTimes: SW.IMaxTravelTimes;
	workHistory: SW.IWorkHistory[];
};

const initialValues: ValueUserTypes & ValueAvailabilityTypes = {
	fullName: '',
	gender: '',
	age: '',
	phoneNumber: '',
	maximumHours: '',
	commuteTypes: [],
	maxTravelTimes: {},
	workHistory: [],
};

const validationSchema = [profileValidationSchema, null, validationSchemaStepTwo, workHistoryValidationSchema];

type SignUpFlowProps = { credential: string; resetSignUp?: () => void };

export const CandidateSignUp = ({ credential, resetSignUp }: SignUpFlowProps) => {
	const router = useRouter();
	const { user, signInUser } = useAuth();

	const initialLocation = { latitude: 0, longitude: 0, postalCode: '' };
	const [step, setStep] = useState<number>(0);
	const [location, setLocation] = useState<SW.ILocation>(initialLocation);
	const [availability, setAvailability] = useState<SW.IAvailability>(createAvailabilityObject());
	const [isCandidateCreated, setCandidateCreated] = useState<boolean>(false);

	// callback to get location coordinates from autocomplete
	const updateLocation = (data: SW.ILocation) => setLocation(data);

	const onSubmit = (values: FormikValues) => {
		if (step === 2) {
			const requestBody = createCandidateRequestBody(values, location, availability, user?.email as string);
			// console.log(JSON.stringify(requestBody, null, 2));
			SimplworkApi.post('candidate', JSON.stringify(requestBody))
				.then((res: any) => {
					setCandidateCreated(true);
				})
				.catch((err: any) => {
					alert('There was an issue creating your account, Please try again.');
					// router.push('/');
				});
		} else {
			setStep((step) => step + 1);
		}
	};

	const progressHeaders: StepProgressHeaderObj[] = [
		{
			name: 'Create Profile',
			description: 'Create your SimplWork profile',
			stepId: 0,
		},
		{
			name: 'Commute Preferences',
			description: 'Enter your commute prefrences',
			stepId: 1,
		},
		{
			name: 'Work Availability',
			description: 'Enter your work availability',
			stepId: 2,
		},
		{
			name: 'Work Experience',
			description: 'Enter your work experience',
			stepId: 3,
		},
	];

	const onAvailabilitySave = (shifts: SW.IShift[]) => setAvailability(convertShiftsToAvailability(shifts));

	return (
		<RegisterLayout step={step} stepProgressHeaders={progressHeaders}>
			{isCandidateCreated ? (
				<Step>
					<StepHeader title='Work Experience' subtitle='Add work experience to help' />
					<SignUpExperienceForm />
					<button
						className='btn-blue '
						onClick={() => {
							signInUser(credential);
							router.push('/');
						}}>
						Complete
					</button>
				</Step>
			) : (
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema[step]}>
					{({ values }) => (
						<Form noValidate>
							{step === 0 && (
								<Step>
									<StepHeader title='Create Profile' subtitle='Enter your details to create a profile' />
									<ProfileForm />
									<StepperButtons step={step} updateStep={setStep} />
								</Step>
							)}
							{step === 1 && (
								<Step>
									<StepHeader title='Add Commute Preferences' subtitle='Enter your details to create a profile' />
									<AutoComplete update={updateLocation} />
									<div className='flex flex-col gap-5'>
										<h1 className='text-md pt-3 font-medium'>
											Select the modes of transport available to you and the maximum amount of time you are willing to commute each way
										</h1>
										<CommuteSelect values={values} />
									</div>
									<StepperButtons step={step} updateStep={setStep} />
								</Step>
							)}
							{step === 2 && (
								<Step>
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
										<div className='overflow-y-auto'>
											<AvailabilityEditSignUp availability={availability} onSave={onAvailabilitySave} />
										</div>
									</div>
									<StepperButtons step={step} updateStep={setStep} renderBackButton={true} />
								</Step>
							)}
						</Form>
					)}
				</Formik>
			)}
		</RegisterLayout>
	);
};
