import { CommutePostTags } from '@components/Posts/PostTags';
import React from 'react';

type ProfileInfoCardProps = {
	candidate: SW.Candidate.ICandidate;
};

export const ProfileInfoCard = ({ candidate }: ProfileInfoCardProps) => {
	return (
		<div className=' bg-gray-100 p-5 rounded-md flex flex-col gap-3 overflow-hidden'>
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
				<h1 className='font-semibold pb-1'>Work Hours:</h1>
				<p>{candidate?.maximumHours}</p>
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
	);
};
