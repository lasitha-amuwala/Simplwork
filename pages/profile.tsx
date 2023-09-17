import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';

import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { ExperienceList } from '@components/Lists/Experience/ExperienceList';
import { queries } from '@utils/simplwork';
import { AddExperienceDialog } from '@components/Dialogs/Experience/ExperienceAddDialog';
import { ProfileEditDialog } from '@components/Dialogs/Profile/ProfileEditDialog';
import { HeaderWithButton } from '@components/Profile/HeaderWithButton';
import { MyInformationCard } from '@components/Profile/MyInformationCard';
import { CandidateAvailabilityEditDialog } from '@components/AvailabilityWidget/CandidateAvailabilityEditDialog';
import { Card } from '@components/Card';
import { CgMathPlus } from 'react-icons/cg';
import { ProfileImage } from '@components/ProfileImage';

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
					<ProfileImage image={user?.picture} />
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
							<AddExperienceDialog triggerLabel={<CgMathPlus />} triggerClassName='light-blue-round-btn' />
						</HeaderWithButton>
						<div className='max-h-[800px] overflow-y-auto pr-2 pb-3'>
							<ExperienceList history={candidate?.workHistory ?? []} renderButtons />
						</div>
					</div>
					<div className='w-6/12 flex flex-col gap-5 '>
						<div>
							<HeaderWithButton title='My Information'>
								<ProfileEditDialog profileData={candidate} />
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
