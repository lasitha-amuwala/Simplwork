import Image from 'next/image';
import AuthCard from '@/src/components/Auth/AuthCard';
import { GoogleButton } from '@/src/components/Auth/GoogleButton';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement } from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const stepDescription = () => {};

const SignUp: NextPageWithLayout = () => (
	<div className='flex h-full w-full'>
		<div className='flex flex-col items-start w-1/3 min-w-[400px] p-10'>
			<div className='pb-20'>
				<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
			</div>
			<div className='flex flex-col gap-5'>
				<div className='flex gap-3'>
					<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5' />
					<div className='flex flex-col'>
						<h1 className='font-semibold text-lg'>Sign Up Method</h1>
						<p>Choose a sign up method</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5' />
					<div className='flex flex-col'>
						<h1 className='font-semibold text-lg'>Select Account Type</h1>
						<p>Please select the account type that you wish to create</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5' />
					<div className='flex flex-col'>
						<h1 className='font-semibold text-lg'>Create Profile</h1>
						<p>Please select the account type that you wish to create</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5' />
					<div className='flex flex-col'>
						<h1 className='font-semibold text-lg'>Add Work Availability</h1>
						<p>Please add your work availability</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<CheckCircledIcon className='text-sky-600 w-7 h-7 mt-0.5' />
					<div className='flex flex-col'>
						<h1 className='font-semibold text-lg'>Add Work Experience</h1>
						<p>Please add your work experience</p>
					</div>
				</div>
			</div>
		</div>
		<div className='w-2/3 bg-white h-full p-10 flex justify-center items-center'>
			<AuthCard title='Try Simplwork for free' subtitle='' linkText='Already have an account? Sign in' linkHref='/signin'>
				<GoogleButton text='Sign up' />
			</AuthCard>
		</div>
	</div>
);

SignUp.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
