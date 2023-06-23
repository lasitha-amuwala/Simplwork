// import { FriendList } from '@/src/components/Example';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { simplwork } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const Profile: NextPage = (props: Props) => {

	const { user } = useAuth();
	const { data: candidate, isLoading } = useQuery(simplwork.candidate.getCandidate(user?.credential as string));

	if (isLoading) return <div>loading</div>;

	return (
		<ProtectedPage>
			<div className='bg-white rounded-3xl border mt-7 w-full overflow-hidden'>
				<div className='h-36 bg-gradient-to-r from-white to-[#69BEFF]/60 w-full'></div>
				<div className='h-36'>{candidate?.candidateName}</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
