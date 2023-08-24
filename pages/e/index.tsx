import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { CreatePostingDialog } from '@components/Posts/CreatePostingDialog';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user } = useAuth();
	return (
		<ProtectedPage>
			<Head>
				<title>Home - Employer Simplwork</title>
			</Head>
			Employer side {user?.email}
			<CreatePostingDialog />
		</ProtectedPage>
	);
};

export default Home;
