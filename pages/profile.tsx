// import { FriendList } from '@/src/components/Example';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { simplwork } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import React from 'react';

type Props = {};

const Profile: NextPage = (props: Props) => {
	// const router = useRouter();
	const { user } = useAuth();
	const { data: candidate, isLoading } = useQuery(simplwork.candidate.getCandidate(user?.credential as string));

	// if (!user?.credential) router.replace('/signin');

	if (isLoading) return <div>loading</div>;
	return (
		<div className='bg-white rounded-3xl border mt-7 w-full overflow-hidden'>
			<div className='h-36 bg-gradient-to-r from-white to-[#69BEFF]/60 w-full'></div>
			<div className='h-36'>{candidate?.candidateName}</div>
		</div>
	);
};

export default Profile;
