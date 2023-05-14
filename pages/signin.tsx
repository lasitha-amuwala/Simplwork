import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { AuthCard } from '@/src/components/Auth/AuthCard';

const SignIn: NextPageWithLayout = () => {
	const router = useRouter()
	const { setCredential } = useAuth()

	const handleOnSuccess = (credentialResponse: CredentialResponse) => {
		setCredential(credentialResponse)
		router.push('/')
	}

	return (
		<div className=' md:bg-white h-auto p-10 rounded-xl md:border border-neural-200'>
			<AuthCard title='Welcome Back' subtitle='Please login to continue' linkText="Don't have an account? Sign up" linkHref='/signup'>
				<GoogleLogin useOneTap shape='pill' onSuccess={credentialResponse => handleOnSuccess(credentialResponse)}
					onError={() => console.log('Login Failed')} />
			</AuthCard></div>
	)
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
