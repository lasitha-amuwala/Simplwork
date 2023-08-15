import Link from 'next/link';
import { useRouter } from 'next/router';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { ReactElement, useState, useEffect } from 'react';
import { EmptyLayout } from '@/src/components/layouts/EmptyLayout';
import { AuthCard } from '@/src/components/Auth/AuthCard';
import { SignUpFlow } from '@/src/components/SignUp/SignUpFlow';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { getGoogleProfile, useAuth } from '@/src/components/Auth/AuthProvider';

type Props = {};

const Register: NextPageWithLayout<Props> = () => {
	const { user, isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user || !isLoggedIn) router.replace('/signin');
		if (user && isLoggedIn) router.replace('/');
	}, [user, isLoggedIn]);

	return <SignUpFlow credential={user?.credential as string} />;
};

Register.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default Register;
