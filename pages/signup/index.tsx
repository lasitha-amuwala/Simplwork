import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement, useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { SignUpFlow } from '@/src/components/Auth/SignUpFlow';

const SignUp: NextPageWithLayout = () => {
	const [googleSuccess, setGoogleSucess] = useState(true);

	const handleSignUp = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) setGoogleSucess(true);
	};

	if (googleSuccess) {
		return <SignUpFlow />;
	}

	return (
		<div className='flex flex-col w-full items-center justify-center'>
			<div className='w-auto bg-white p-10 flex justify-center items-center rounded-xl'>
				<div className='flex items-center flex-col'>
					<AuthCard title='Try Simplwork for free' subtitle='' linkText='Already have an account? Sign in' linkHref='/signin'>
						<GoogleLogin useOneTap width='250' context='signup' shape='pill' onSuccess={handleSignUp}></GoogleLogin>
					</AuthCard>
				</div>
			</div>
		</div>
	);
};

SignUp.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
