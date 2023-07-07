import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { simplwork } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

type ProfileProps = {};

const Profile: NextPage = (props: ProfileProps) => {
	const { user } = useAuth();
	const { data: candidate } = useQuery(simplwork.candidate.getCandidate(user?.credential ?? ''));

	return (
		<ProtectedPage>
			<div className='bg-white rounded-3xl border mt-7 w-full overflow-hidden'>
				<div className='relative'>
					<div className='h-36 bg-gradient-to-r from-white to-sw-300 w-full'></div>
					<div className='h-36 flex justify-between bg-white py-5 px-5'>
						<div className='flex flex-col ml-56'>
							{candidate && <h1 className='text-4xl font-semibold'>{candidate.candidateName}</h1>}
							<p className='text-lg text-gray-500'>{'tagline'}</p>
						</div>
						<div>
							<button className='bg-black text-white py-2 px-3 rounded-xl'>Edit Profile</button>
						</div>
					</div>
					<div className='absolute top-1/2 -translate-y-1/3 left-10 rounded-full w-[175px] h-[175px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
						<div className='w-[165px] h-[165px] rounded-full relative overflow-hidden'>
							{user?.picture && (
								<Image
									className='object-cover'
									src={user?.picture.replace('s96-c', 's384-c')}
									alt='profile picture'
									fill
									quality={100}
									priority
									placeholder='blur'
									blurDataURL={user?.picture}
								/>
							)}
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
