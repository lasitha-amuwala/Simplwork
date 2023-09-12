import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@typings/NextPageWithLayout';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@components/Auth/AuthProvider';
import { AuthCard } from '@components/Auth/AuthCard';
import { useRouter } from 'next/router';
import { EmptyLayout } from '../src/Layouts/EmptyLayout';
import Link from 'next/link';
import { CenterPage } from '@components/CenterPage';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter();
	const { user, isLoggedIn, onSignIn } = useAuth();

	useEffect(() => {
		if (user && isLoggedIn) router.push('/');
	}, [user, isLoggedIn, router]);

	return (
		<CenterPage>
			<AuthCard title='Candidate Sign In' subtitle='Continue with Google to sign in or register.'>
				<GoogleLogin useOneTap width={250} shape='pill' text='continue_with' onSuccess={onSignIn} onError={() => console.log('Login Failed')} />
				<Link href='/e/signin' className='font-medium text-xs'>
					Employer? Sign in or register<span className='text-blue-700 '> here</span>
				</Link>
			</AuthCard>
		</CenterPage>
	);
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout title='Sign In'>{page}</EmptyLayout>;
};

export default SignIn;
