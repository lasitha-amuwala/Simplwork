import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { AddExperienceDialog } from '@components/Dialogs/ExperienceFormDialogs/AddExperienceDialog';
import { EditProfileDialog } from '@components/Dialogs/ProfileFormDialog/EditProfileDialog';
import { ExperienceList } from '@components/ExperienceList';
import { CommutePostTags } from '@components/Posts/PostTags/CommutePostTags';
import { Candidate } from '@typings/api/candidate';
import { queries } from '@utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { AvailabilityEdit } from '@components/AvailabilityWidget';
import Image from 'next/image';

type ProfileProps = {};

const Profile: NextPage = (props: ProfileProps) => {
	const { user } = useAuth();
	const { data: candidate, isLoading, isError } = useQuery<Candidate>(queries.candidate.getCandidate(user?.credential ?? ''));

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>error</div>;
	return (
		<ProtectedPage>
			<div className=' bg-white rounded-lg border mt-7 w-full overflow-hidden'>
				<div className='relative'>
					<div className='h-36 bg-gradient-to-r from-white to-sw-300 w-full' />
					<div className='  h-auto flex justify-between bg-white p-5'>
						<div className='flex flex-col ml-52'>{candidate && <h1 className='text-4xl font-semibold'>{candidate.candidateName}</h1>}</div>
						<div className='absolute top-0 left-5 rounded-full w-[175px] h-[175px] bg-sw-100 overflow-hidden flex justify-center items-center shadow-lg '>
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
						<div className='flex justify-between pb-5'>
							<h1 className='text-2xl font-semibold self-end'>Work Experience</h1>
							<AddExperienceDialog />
						</div>
						<ExperienceList history={candidate?.workHistory ?? []} />
					</div>
					<div className='w-5/12 flex flex-col gap-5'>
						<div>
							<h1 className='text-2xl font-semibold pb-3'>My Information</h1>
							<div className=' bg-gray-100 p-5 rounded-md flex flex-col gap-3'>
								<div className=''>
									<h1 className='font-semibold'>Email:</h1>
									<p>{candidate?.email}</p>
								</div>
								<div>
									<h1 className='font-semibold'>Gender:</h1>
									<p>{candidate.gender.charAt(0) + candidate.gender.slice(1).toLowerCase()}</p>
								</div>
								<div>
									<h1 className='font-semibold'>Age:</h1>
									<p>{candidate?.age}</p>
								</div>
								<div>
									<h1 className='font-semibold'>Phone Number:</h1>
									<p>{candidate?.phoneNumber}</p>
								</div>
								<div>
									<h1 className='font-semibold pb-1'>Commute Preferences:</h1>
									<CommutePostTags
										CarCommuteTime={candidate.maxTravelTimes.CAR}
										bikeCommuteTime={candidate.maxTravelTimes.BIKE}
										walkCommuteTime={candidate.maxTravelTimes.WALK}
										publicTransiteCommuteTime={candidate.maxTravelTimes.PUBLIC_TRANSIT}
									/>
								</div>
							</div>
						</div>
						<div>
							<h1 className='text-2xl font-semibold pb-3'>My Availability</h1>
							<AvailabilityEdit availability={candidate?.availability} />
						</div>
					</div>
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
