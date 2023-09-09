import Image from 'next/image';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';

import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { ExperienceList } from '@components/Lists/Experience/ExperienceList';
import { queries } from '@utils/simplwork';
import { AddExperienceDialog } from '@components/Dialogs/AddExperience/AddExperienceDialog';
import { EditProfileDialog } from '@components/Dialogs/EditProfile/EditProfileDialog';
import { HeaderWithButton } from '@components/Profile/HeaderWithButton';
import { ProfileInfoCard } from '@components/Profile/ProfileInfoCard';
import { CandidateAvailabilityEditDialog } from '@components/AvailabilityWidget/CandidateAvailabilityEditDialog';

const Profile: NextPage = () => {
	const { user } = useAuth();
	const { data: candidate, isLoading, isError } = useQuery<SW.Candidate.ICandidate>(queries.candidate.getCandidate(user?.credential ?? ''));

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>error</div>;
	return (
		<ProtectedPage>
			<Head>
				<title>Profile - Simplwork</title>
			</Head>
			<div className='bg-white rounded-lg border mt-7 w-full overflow-hidden'>
				<div className='relative'>
					<div className='h-36 bg-gradient-to-r from-white to-sw-300 w-full' />
					<div className='h-auto flex justify-between bg-white p-5'>
						{candidate && <h1 className='text-4xl font-semibold ml-52'>{candidate.candidateName}</h1>}
						<div className='absolute top-11 left-5 rounded-full w-[175px] h-[175px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
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
				</div>
				<div className='p-5 flex gap-5'>
					<div className='w-7/12 h-auto'>
						<HeaderWithButton title='My Experience'>
							<AddExperienceDialog />
						</HeaderWithButton>
						<div className='max-h-[800px] overflow-y-auto pr-1'>
							<ExperienceList history={candidate?.workHistory ?? []} />
						</div>
					</div>
					<div className='w-5/12 flex flex-col gap-5 '>
						<div>
							<HeaderWithButton title='My Information'>
								<EditProfileDialog profileData={candidate} />
							</HeaderWithButton>
							<ProfileInfoCard candidate={candidate} />
						</div>
						<CandidateAvailabilityEditDialog availability={candidate?.availability} />
					</div>
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
