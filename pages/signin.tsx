import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/layouts/EmptyLayout';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter();
	const { user, handleSignIn } = useAuth();

	useEffect(() => {
		if (user?.credential) router.push('/');
	}, [user, router]);

	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<div className='flex items-center flex-col w-auto bg-white p-10 justify-center rounded-xl border border-gray-200'>
				<AuthCard title='Welcome Back' subtitle='Please login to continue' linkText="Don't have an account? Sign up" linkHref='/signup'>
					<GoogleLogin useOneTap width='250' shape='pill' onSuccess={handleSignIn} onError={() => console.log('Login Failed')} />
				</AuthCard>
			</div>
		</div>
	);
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
