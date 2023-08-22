import React, { useState } from 'react';
import { StepProgressHeaderObj } from '../StepProgressHeader';
import { Form, Formik, FormikValues } from 'formik';
import { SimplworkApi } from '@utils/simplwork';
import { employerProfile } from '@components/Formik/FormValidation';
import { RegisterLayout } from '../RegisterLayout';
import { Step } from '../Step';
import { StepHeader } from '../StepHeader';
import { FieldControl } from '@components/Formik/Feilds/FieldControl';
import { StepperButtons } from '../StepperButtons';
import { SignUpBranchForm } from './SignUpBranchesForm';
import { useRouter } from 'next/router';

type Props = {};

export const EmployerSignUp = (props: Props) => {
	const router = useRouter();
	const [step, setStep] = useState<number>(0);
	const [employerName, setEmployerName] = useState<string>('');
	const [isEmployerCreated, setIsEmployerCreated] = useState<boolean>(false);

	const progressHeaders: StepProgressHeaderObj[] = [
		{
			name: 'Create Compnay Profile',
			description: 'Create your SimplWork company profile',
			stepId: 0,
		},
		{
			name: 'Add Branches',
			description: 'Add branches to your company profile',
			stepId: 1,
		},
	];

	type Values = {
		companyName: string;
		companyDescription: string;
	};

	const initialValues: Values = {
		companyName: '',
		companyDescription: '',
	};

	const onSubmit = ({ companyName, companyDescription }: FormikValues) => {
		if (step == 0) {
			SimplworkApi.post('employer', { companyName, companyDescription })
				.then(() => {
					setIsEmployerCreated(true);
					setEmployerName(companyName);
					window.localStorage.setItem('employerName', companyName);
					setStep((step) => step + 1);
				})
				.catch((err) => {
					console.log(err);
					//reset form
				});
		} else if (step == 1) {
			router.push('/e/');
		} else {
			setStep((step) => step + 1);
		}
	};

	return (
		<RegisterLayout step={step} stepProgressHeaders={progressHeaders}>
			{!isEmployerCreated ? (
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={employerProfile}>
					{({ values }) => (
						<Form noValidate>
							<Step>
								<StepHeader title='Create Profile' subtitle='Enter your details to create a profile' />
								<FieldControl name='companyName' label='Company Name' type='text' />
								<FieldControl name='companyDescription' label='Company Description' type='text' as='textarea' className='h-52 inputStyle' />
								<StepperButtons step={step} updateStep={setStep} />
							</Step>
						</Form>
					)}
				</Formik>
			) : (
				<Step>
					<StepHeader title='Add Branches' subtitle='Add Branches to your company' />
					<SignUpBranchForm employerName={employerName} />
					<button className='btn-blue' onClick={() => router.push('/e/')}>
						Complete
					</button>
				</Step>
			)}
		</RegisterLayout>
	);
};
