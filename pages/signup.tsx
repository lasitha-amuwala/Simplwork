import Link from 'next/link';
import { useRouter } from 'next/router';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { ReactElement, useState } from 'react';
import { GoogleProfileData } from '@/src/types/Auth';
import { EmptyLayout } from '@/src/layouts/EmptyLayout';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { SignUpFlow } from '@/src/components/SignUp/SignUpFlow';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { getGoogleProfile, useAuth } from '@/src/components/Auth/AuthProvider';

type Props = {};

const SignUp: NextPageWithLayout<Props> = () => {
	const router = useRouter();
	const { onSignUp } = useAuth();
	const [userData, setUserData] = useState<GoogleProfileData>();
	const [renderSignUpFlow, setRenderSignUpFlow] = useState<boolean>(false);

	const handleSignUp = async (response: CredentialResponse) => {
		setUserData(getGoogleProfile(response.credential as string));
		const isNewUser = await onSignUp(response);
		if (isNewUser) setRenderSignUpFlow(true);
	};

	if (renderSignUpFlow && userData) return <SignUpFlow userData={userData} />;

	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<div className='flex items-center flex-col w-auto bg-white p-10 justify-center rounded-xl border border-gray-200'>
				<AuthCard title='Try Simplwork for free' subtitle='Sign up today!'>
					<GoogleLogin useOneTap width='250' text='continue_with' context='signup' shape='pill' onSuccess={handleSignUp} />
					<p className='pt-5 text-gray-600 text-sm'>
						Already have an account? Sign in{' '}
						<Link href='/' className='text-sky-500 hover:text-sky-700 font-semibold w-[250px]'>
							here
						</Link>
					</p>
				</AuthCard>
			</div>
		</div>
	);
};

SignUp.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
