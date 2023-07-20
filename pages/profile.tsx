import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { AddExperienceDialog } from '@/src/components/Dialogs/AddExperienceDialog';
import { EditProfileDialog } from '@/src/components/Dialogs/EditProfileDialog';
import { WorkExperience } from '@/src/components/SignUp/WorkExperience';
import { WorkExperienceList } from '@/src/components/ExperienceList';
import { queries } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

type ProfileProps = {};

const Profile: NextPage = (props: ProfileProps) => {
	const { user } = useAuth();
	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));

	if (isLoading) return <div>Loading</div>;
	return (
		<ProtectedPage>
			<div className='bg-white rounded-lg border mt-7 w-full overflow-hidden'>
				<div className='relative'>
					<div className='h-36 bg-gradient-to-r from-white to-sw-300 w-full'></div>
					<div className='h-auto flex justify-between bg-white p-5'>
						<div className='flex flex-col ml-52'>
							{candidate && <h1 className='text-4xl font-semibold'>{candidate.candidateName}</h1>}
							<p className='text-lg text-gray-500'>{'tagline'}</p>
						</div>
						<div>
							<EditProfileDialog profileData={candidate} />
						</div>
					</div>
					<div className='absolute top-1/2 -translate-y-1/3 left-5 rounded-full w-[175px] h-[175px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
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
				<div className='p-5 flex gap-5'>
					<div className='w-7/12 h-auto'>
						<div className='flex justify-between'>
							<h1 className='text-2xl font-semibold self-end'>Work Experience</h1>
							<AddExperienceDialog />
						</div>
						<WorkExperienceList history={candidate.workHistory} />
					</div>
					<div className='w-5/12'>
						<h1 className='text-2xl font-semibold pb-1'>My Information</h1>
						<div className=' bg-sw-50 p-5 rounded-md flex flex-col gap-3'>
							<div className=''>
								<h1 className='font-semibold'>Email:</h1>
								<p>{candidate.email}</p>
							</div>
							<div>
								<h1 className='font-semibold'>Gender:</h1>
								<p>{candidate.gender.charAt(0) + candidate.gender.slice(1).toLowerCase()}</p>
							</div>
							<div>
								<h1 className='font-semibold'>Age:</h1>
								<p>{candidate.age}</p>
							</div>
							<div>
								<h1 className='font-semibold'>Phone Number:</h1>
								<p>{candidate.phoneNumber}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
