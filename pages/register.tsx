import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { EmptyLayout } from '@components/Layouts/EmptyLayout';
import { NextPageWithLayout } from '@typings/NextPageWithLayout';
import { SignUpFlow } from '@components/SignUp/SignUpFlow';
import { useAuth } from '@components/Auth/AuthProvider';

type Props = {};

const Register: NextPageWithLayout<Props> = () => {
	const { user, isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user || !isLoggedIn) router.replace('/signin');
		if (user && isLoggedIn) router.replace('/');
	}, [user, isLoggedIn, router]);

	return <SignUpFlow credential={user?.credential as string} />;
};

Register.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default Register;
