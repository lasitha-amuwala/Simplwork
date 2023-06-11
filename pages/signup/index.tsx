import { AuthCard } from '@/src/components/Auth/AuthCard';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { ReactElement } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { SignUpFlow } from '@/src/components/Auth/SignUpFlow';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { SimplworkClient } from '@/src/utils/simplwork';


const SignUp: NextPageWithLayout = () => {
	const { user, handleSignIn } = useAuth();

	const getCandidate = async (credential: string) => {
		await SimplworkClient(credential).get('candidate').then(res => {
			console.log(res)
		}).catch(error => {
			console.log(error)
			if (error.response) {
				if (error.response.status === 404) {
					return true
				}
			} else if (error.request) {
				console.log('hi5')
			} else {
				console.log('Error', error.message)
			}
		})
	}

	if (user?.credential) {
		const candidate = getCandidate(user.credential)
		console.log(candidate)
	}

	return (
		<div className='flex flex-col w-full items-center justify-center'>
			<div className='w-auto bg-white p-10 flex justify-center items-center rounded-xl'>
				<div className='flex items-center flex-col'>
					<AuthCard title='Try Simplwork for free' subtitle='' linkText='Already have an account? Sign in' linkHref='/signin'>
						<GoogleLogin useOneTap width='250' context='signup' shape='pill' onSuccess={handleSignIn}></GoogleLogin>
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
