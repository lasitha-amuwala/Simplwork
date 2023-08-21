import { ReactElement, useEffect } from 'react';
import { EmptyLayout } from '../../src/Layouts/EmptyLayout';
import { EmployerSignUp } from '@components/SignUp/Employer/EmployerSignUp';
import { useRouter } from 'next/router';
import { useAuth } from '@components/Auth/AuthProvider';

const Register = () => {
	const { user, isLoggedIn } = useAuth();
	const router = useRouter();

	// useEffect(() => {
	// 	if (!user) router.replace('/signin');
	// 	if (user && isLoggedIn) router.replace('/');
	// }, [user, isLoggedIn, router]);

	useEffect(() => {
		if (!user) router.replace('/e/register');
	}, [user]);
	return <EmployerSignUp />;
};

Register.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default Register;
