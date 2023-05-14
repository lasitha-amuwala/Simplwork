import Image from 'next/image';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement, useState } from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const StepHeader = ({ name, description }: { name: string, description: string }) => {
	return (
		<div className='flex gap-3'>
			<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5 shrink-0' />
			<div className='flex flex-col'>
				<h1 className='font-semibold text-lg'>{name}</h1>
				<p className='text-base'>{description}</p>
			</div>
		</div>
	)
};

const SignUpForm = ({ step }: { step: number }) => {

	if (step == 0) {
		return (
			<AuthCard title='Try Simplwork for free' subtitle='' linkText='Already have an account? Sign in' linkHref='/signin'>
				{/* <GoogleButton text='Sign up' /> */}
			</AuthCard>
		)
	}

	return (
		<div>{step}</div>
	)


}

const SignUp: NextPageWithLayout = () => {
	const [step, setStep] = useState(0)


	return (
		<div className='flex h-full w-full'>
			<div className='flex flex-col items-start w-1/3 min-w-[400px] p-10'>
				<div className='pb-16'>
					<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
				</div>
				<div className='flex flex-col gap-5'>
					<StepHeader name="Sign Up Method" description="Choose a sign in method" />
					<StepHeader name="Select Account Type" description="Please select the account type that you wish to create" />
					<StepHeader name="Create Profile" description="Please select the account type that you wish to create" />
					<StepHeader name="Add Work Availability" description="Please add your work availability" />
					<StepHeader name="Add Work Experience" description="Please select the account type that you wish to create" />
				</div>
			</div>
			<div className='w-2/3 bg-white h-full p-10 flex justify-center items-center'>
				<div className='flex items-center flex-col'>
					<SignUpForm step={step} />
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
