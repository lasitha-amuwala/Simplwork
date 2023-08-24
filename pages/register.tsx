import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@typings/NextPageWithLayout';
import { CandidateSignUp } from '@components/SignUp/Candidate/CandidateSignUp';
import { useAuth } from '@components/Auth/AuthProvider';
import { EmptyLayout } from '../src/Layouts/EmptyLayout';

type Props = {};

const Register: NextPageWithLayout<Props> = () => {
	const { user, isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.replace('/signin');
		if (user && isLoggedIn) router.replace('/');
	}, [user, isLoggedIn, router]);

	return <CandidateSignUp credential={user?.credential as string} />;
};

Register.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout title='Register'>{page}</EmptyLayout>;
};

export default Register;
