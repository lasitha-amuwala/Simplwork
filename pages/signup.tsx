import { AuthCard } from '@/src/components/Auth/AuthCard';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement, useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { SignUpFlow } from '@/src/components/SignUp/SignUpFlow';
import { decodeCredential, useAuth } from '@/src/components/Auth/AuthProvider';
import { SimplworkClient } from '@/src/utils/simplwork';
import { useRouter } from 'next/router';
import { GoogleProfileData } from '@/src/types/Auth';
import { User } from '@/src/types/api/candidate';
import { EmptyLayout } from '@/src/layouts/EmptyLayout';
import Link from 'next/link';

type Props = {};

const SignUp: NextPageWithLayout<Props> = () => {
	const router = useRouter();
	const { setUser } = useAuth();
	const [userData, setUserData] = useState<GoogleProfileData>();
	const [renderSignUpFlow, setRenderSignUpFlow] = useState<boolean>(false);

	const handleSignUp = async (response: CredentialResponse) => {
		const googleProfile = decodeCredential(response.credential as string);

		setUserData(googleProfile);
		if (googleProfile.credential) {
			await SimplworkClient(googleProfile.credential)
				.get('candidate')
				.then((res) => {
					// console.log(res);
					const user: User = { ...googleProfile, candidate: res.data };
					setUser(user);
					router.push('/');
				})
				.catch((error) => {
					if (error.response) {
						setRenderSignUpFlow(true);
					} else if (error.request) {
						alert('There was a problem. Try Again.');
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
				});
		}
	};

	if (renderSignUpFlow && userData) return <SignUpFlow userData={userData} />;

	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<div className='flex items-center flex-col w-auto bg-white p-10 justify-center rounded-xl border border-gray-200'>
				<AuthCard title='Try Simplwork for free' subtitle='Sign up today!'>
					<GoogleLogin useOneTap width='250' text='signup_with' context='signup' shape='pill' onSuccess={handleSignUp} />
					<p className='pt-5 text-gray-600 text-sm'>
						Already have an account? Sign in{' '}
						<Link href='/' className='text-sky-500 hover:text-sky-700 font-semibold'>
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
