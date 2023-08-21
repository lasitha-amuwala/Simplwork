import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import React from 'react';

type Props = {};

const index = (props: Props) => {
	const { user } = useAuth();
	return <ProtectedPage>Employer side {user?.email}</ProtectedPage>;
};

export default index;
