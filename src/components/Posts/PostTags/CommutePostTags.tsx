import { MdLocationPin } from 'react-icons/md';
import { PostTag } from './PostTag';
import { commuteTypes } from '../../SignUp/Candidate/CommuteCheckBox';

const displayDistance = (distance: number) => {
	if (distance < 0.1) {
		const distanceInMetres = Math.round(distance * 1000);
		return `${Number.parseFloat(distanceInMetres.toFixed(1))}m`;
	}
	return `${Number.parseFloat(distance.toFixed(1))}km`;
};

export const CommutePostTags = ({
	distance,
	CarCommuteTime,
	bikeCommuteTime,
	walkCommuteTime,
	publicTransiteCommuteTime,
}: {
	distance?: number;
	CarCommuteTime?: number;
	bikeCommuteTime?: number;
	walkCommuteTime?: number;
	publicTransiteCommuteTime?: number;
}) => {
	return (
		<div className='flex gap-3 text-gray-600 flex-nowrap'>
			{distance && (
				<PostTag icon={<MdLocationPin />}>
					<p>{`${displayDistance(distance)}`}</p>
				</PostTag>
			)}
			{CarCommuteTime != undefined && CarCommuteTime != null && (
				<PostTag icon={commuteTypes.CAR.icon}>
					<p>{`${CarCommuteTime} min`}</p>
				</PostTag>
			)}
			{bikeCommuteTime != undefined && bikeCommuteTime != null && (
				<PostTag icon={commuteTypes.BIKE.icon}>
					<p>{`${bikeCommuteTime} min`}</p>
				</PostTag>
			)}
			{walkCommuteTime != undefined && walkCommuteTime != null && (
				<PostTag icon={commuteTypes.WALK.icon}>
					<p>{`${walkCommuteTime} min`}</p>
				</PostTag>
			)}
			{publicTransiteCommuteTime != undefined && publicTransiteCommuteTime != null && (
				<PostTag icon={commuteTypes.PUBLIC_TRANSIT.icon}>
					<p>{`${publicTransiteCommuteTime} min`}</p>
				</PostTag>
			)}
		</div>
	);
};
