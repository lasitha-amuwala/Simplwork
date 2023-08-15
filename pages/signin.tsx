import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@typings/NextPageWithLayout';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@components/Auth/AuthProvider';
import { AuthCard } from '@components/Auth/AuthCard';
import { EmptyLayout } from '@components/layouts/EmptyLayout';
import { useRouter } from 'next/router';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter();
	const { user, isLoggedIn, onSignIn } = useAuth();

	useEffect(() => {
		if (user && isLoggedIn) router.push('/');
	}, [user, isLoggedIn, router]);

	return (
		<div className='flex items-center justify-center h-screen'>
			<AuthCard title='Sign in or Register' subtitle='Continue with google to sign in or register.'>
				<GoogleLogin useOneTap width={250} shape='pill' text='continue_with' onSuccess={onSignIn} onError={() => console.log('Login Failed')} />
			</AuthCard>
		</div>
	);
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
