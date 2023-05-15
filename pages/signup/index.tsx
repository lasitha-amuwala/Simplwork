import Image from 'next/image';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement, useState } from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import * as Form from '@radix-ui/react-form';
import { Formik } from 'formik';

const StepHeader = ({ name, description, stepId, currStep }: { name: string, description: string, stepId: number, currStep: number }) => {
	const textColor = currStep === stepId ? 'text-black' : 'text-neutral-400'
	const iconColor = currStep === stepId ? 'text-sky-700' : currStep > stepId ? 'text-[#64B1EC]' : 'text-neutral-400'

	return (
		<div className='flex gap-3'>
			<CheckCircledIcon className={`${iconColor} w-6 h-6 mt-0.5 shrink-0`} />
			<div className='flex flex-col'>
				<h1 className={`${textColor} font-semibold text-base`}>{name}</h1>
				<p className={`${textColor} text-sm font-font-normal`}>{description}</p>
			</div>
		</div>
	)
};

const SignUpForm = ({ step, updateStep }: { step: number, updateStep: (arg: number) => void }) => {

	const initialValues = {}

	const handleSignUp = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) {
			updateStep(1)
		}
	}

	if (step == 1) {
		return (
			<div className='flex flex-col gap-3 items-center'>
				<h3 className='text-2xl pt-3 font-medium'>Create Profile</h3>
				<p className='pt-1 pb-2 text-center'>Enter your information to create your profile</p>
				<Formik
					initialValues={initialValues}
					onSubmit={() => { }}
				>
				</Formik>

			</div>
		)
	}

	return (
		<AuthCard title='Try Simplwork for free' subtitle='' linkText='Already have an account? Sign in' linkHref='/signin'>
			<GoogleLogin useOneTap width='250' context='signup' shape='pill' onSuccess={(credentialResponse) => handleSignUp(credentialResponse)}></GoogleLogin>
		</AuthCard>

	)
}

const SignUp: NextPageWithLayout = () => {
	const [step, setStep] = useState(0)

	const updateStep = (step: number) => setStep(step)

	return (
		<div className='flex h-full w-full'>
			<div className='flex flex-col items-start w-1/3 min-w-[400px] p-10 '>
				<div className='pb-16'>
					<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
				</div>
				<div className='flex flex-col gap-5'>
					<StepHeader name="Create Profile" description="Please select the account type that you wish to create" stepId={1} currStep={step} />
					<StepHeader name="Add Work Availability" description="Please add your work availability" stepId={2} currStep={step} />
					<StepHeader name="Add Work Experience" description="Please select the account type that you wish to create" stepId={3} currStep={step} />
				</div>
			</div>
			<div className='w-2/3 bg-white h-full p-10 flex justify-center items-center'>
				<div className='flex items-center flex-col'>
					<SignUpForm step={step} updateStep={updateStep} />
					<button onClick={() => setStep(step + 1)}>Increase</button>
					<button onClick={() => setStep(step - 1)}>Decrease</button>

				</div>

			</div>
		</div>
	)
};

SignUp.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
