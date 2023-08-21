import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user } = useAuth();
	return <ProtectedPage>Employer side {user?.email}</ProtectedPage>;
};

export default Home;
