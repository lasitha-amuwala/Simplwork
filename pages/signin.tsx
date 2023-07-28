import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/layouts/EmptyLayout';
import Link from 'next/link';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter();
	// const { user, onSignIn } = useAuth();

	useEffect(() => {
		router.push('/');
	}, [router]);

	// useEffect(() => {
	// 	if (user) router.push('/');
	// }, [user, router]);

	return <SignInCard />;
};

export const SignInCard = () => {
	const { onSignIn } = useAuth();

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='flex items-center flex-col w-auto bg-white p-10 justify-center rounded-xl border border-gray-200'>
				<AuthCard title='Welcome Back' subtitle='Please login to continue'>
					<GoogleLogin useOneTap width={250} shape='pill' text='signin_with' onSuccess={onSignIn} onError={() => console.log('Login Failed')} />
					<div className='flex w-full justify-center items-center pt-3'>
						<div className='w-1/2 bg-gray-300 h-[1px]' />
						<p className='px-2 text-gray-500 text-sm'>OR</p>
						<div className='w-1/2 bg-gray-300 h-[1px]' />
					</div>
					<Link
						href='/signup'
						className='mt-3 w-[250px] bg-[#64B1EC] p-3 text-white font-semibold text-center items-center rounded-md cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
						Create an account
					</Link>
				</AuthCard>
			</div>
		</div>
	);
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
