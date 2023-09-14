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
import { MyInformationCard } from '@components/Profile/MyInformationCard';
import { CandidateAvailabilityEditDialog } from '@components/AvailabilityWidget/CandidateAvailabilityEditDialog';
import { Card } from '@components/Card';

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
			<div className='w-full overflow-hidden py-10'>
				<div className='h-auto flex px-5 gap-7 items-center pb-10'>
					<div className='rounded-full w-[175px] h-[175px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
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
					{candidate && (
						<div>
							<h1 className='text-4xl font-semibold'>{candidate.candidateName}</h1>
							<h1 className='text-lg text-gray-600'>{candidate.email}</h1>
						</div>
					)}
				</div>
				<div className='px-5 flex gap-4'>
					<div className='w-6/12 h-auto'>
						<HeaderWithButton title='My Experience'>
							<AddExperienceDialog />
						</HeaderWithButton>
						<div className='max-h-[800px] overflow-y-auto pr-1'>
							<ExperienceList history={candidate?.workHistory ?? []} />
						</div>
					</div>
					<div className='w-6/12 flex flex-col gap-5 '>
						<div>
							<HeaderWithButton title='My Information'>
								<EditProfileDialog profileData={candidate} />
							</HeaderWithButton>
							<MyInformationCard candidate={candidate} />
						</div>
						<Card className='bg-white'>
							<CandidateAvailabilityEditDialog availability={candidate?.availability} />
						</Card>
					</div>
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
