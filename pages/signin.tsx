import { ReactElement } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { GoogleButton } from '@/src/components/Auth/GoogleButton';
import { getServerSession } from 'next-auth/next';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import AuthCard from '@/src/components/Auth/AuthCard';

const SignIn: NextPageWithLayout = () => (
<div className=' md:bg-white h-auto p-10 rounded-xl md:border border-neural-200'>
	<AuthCard title='Welcome Back' subtitle='Please login to continue' linkText="Don't have an account? Sign up" linkHref='/signup'>
		<GoogleButton text='Continue' />
	</AuthCard></div>
);

export const getServerSideProps = async (context: any) => {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (session) {
		return {
			redirect: {
				destination: '/',
			},
		};
	}

	return { props: { session } };
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
