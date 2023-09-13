import { ReactElement } from 'react';
import { AuthCard } from '@components/Auth/AuthCard';
import { useAuth } from '@components/Auth/AuthProvider';
import { CenterPage } from '@components/CenterPage';
import { GoogleLogin } from '@react-oauth/google';
import { EmptyLayout } from '../../src/Layouts/EmptyLayout';
import { NextPageWithLayout } from '@typings/NextPageWithLayout';
import Link from 'next/link';

type Props = {};

const SignIn: NextPageWithLayout = (props: Props) => {
	const { onEmplyerSignIn } = useAuth();

	return (
		<CenterPage>
			<AuthCard title='Employer Sign In' subtitle='Continue with Google to sign in or register.'>
				<GoogleLogin
					useOneTap
					width={250}
					shape='pill'
					text='continue_with'
					onSuccess={onEmplyerSignIn}
					onError={() => console.log('Login Failed')}
				/>
				<Link href='/' className='font-medium text-xs'>
					Candidate? Sign in or register<span className='text-blue-700 '> here</span>
				</Link>
			</AuthCard>
		</CenterPage>
	);
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout title='Employer Sign In'>{page}</EmptyLayout>;
};

export default SignIn;
