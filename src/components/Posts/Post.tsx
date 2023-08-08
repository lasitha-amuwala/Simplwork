import { memo, useState, useEffect } from 'react';
import { PostSkeleton } from './Skeletons/PostSkeleton';
import { useMutation } from '@tanstack/react-query';
import { SimplworkApi } from '@/src/utils/simplwork';
import { PostedDate } from './PostedDate';
import { commuteTypes } from '../SignUp/CommuteCheckBox';
import { PostTag } from './PostTag';
import { MdLocationPin } from 'react-icons/md';
import ScheduleSelector from 'react-schedule-selector';
import { CandaidateAvailibility, PostingResponse, ShiftTimes } from '@/src/types/api/candidate';
import { AvailabilityWidget, constructAvailabilityObject } from '../AvailabilityWiget';
import { ViewAvailability } from '../AvailabilityWiget/AvailabilityViewDialog';

type PostProps = {
	posts: PostingResponse[];
	selectedPost: number;
};
const applyToPost = async (data: any) => {
	console.log(JSON.stringify(data));
	const res = await SimplworkApi.post(`candidate/postings/setStatus?id=${data.id}&status=${data.status}`);
	console.log('res', JSON.stringify(res.data, null, 2));
	return res;
};

const displayDistance = (distance: number) => {
	if (distance < 0.1) {
		const distanceInMetres = Math.round(distance * 1000);
		return `${Number.parseFloat(distanceInMetres.toFixed(1))}m`;
	}
	return `${Number.parseFloat(distance.toFixed(1))}km`;
};

export const Post = ({ posts, selectedPost }: PostProps) => {
	const mutation = useMutation({ mutationFn: applyToPost });

	const post = posts[selectedPost];
	const isMatch = !!post.candidateStatus;

	const handleOnClick = () => {
		console.log('clicked: ', post.posting.id);
		mutation.mutate({ id: post.posting.id, status: 'APPLIED' });
		// console.log(post.posting.id);
	};

	const CompanyCard = () => {
		return (
			<div className='bg-[#64B1EC]/10 border-b p-4 flex flex-col gap-4 overflow-auto'>
				<div className='h-auto flex gap-4'>
					<div className='h-20 w-20 bg-blue-300 rounded-md shrink-0'></div>
					<div className='grow'>
						<div className='flex'>
							<div className='flex flex-col grow'>
								<h1 className='font-semibold text-xl'>{post.posting.employer.companyName}</h1>
								<p className='font-normal text-lg '>{post.posting.employer?.branches[0].branchName}</p>
							</div>
							{!post.candidateStatus ? (
								<button className='btn-blue self-start' onClick={handleOnClick}>
									Apply
								</button>
							) : (
								<div className='bg-green-100 self-start text-green-600 font-medium px-2 py-1 rounded-md'>Applied</div>
							)}
						</div>
						<p className='text-md text-gray-500'>{post.posting.employer.companyDescription}</p>
					</div>
				</div>
				{isMatch && (
					<div className='flex gap-3 text-gray-600'>
						{post.distance && (
							<PostTag icon={<MdLocationPin />}>
								<p>{`${displayDistance(post.distance)}`}</p>
							</PostTag>
						)}
						{post.carCommuteTime && (
							<PostTag icon={commuteTypes.CAR.icon}>
								<p>{`${post.carCommuteTime} min`}</p>
							</PostTag>
						)}
						{post.bikeCommuteTime && (
							<PostTag icon={commuteTypes.BIKE.icon}>
								<p>{`${post.bikeCommuteTime} min`}</p>
							</PostTag>
						)}
						{post.walkCommuteTime && (
							<PostTag icon={commuteTypes.WALK.icon}>
								<p>{`${post.walkCommuteTime} min`}</p>
							</PostTag>
						)}
					</div>
				)}
			</div>
		);
	};

	type PostBodyProps = { post: PostingResponse };

	const PostBody = ({ post }: PostBodyProps) => {
		// const [schedule, setSchedule] = useState([]);

		const availability = constructAvailabilityObject(post.posting.shifts);

		return (
			<div className='p-5'>
				<div>
					<div className='text-2xl font-semibold'>{`$${post.posting.pay}/hr`}</div>
				</div>
				<div className='my-5 flex flex-col gap-2'>
					<h1 className='font-semibold text-lg'>Job Description</h1>
					<p className='text-gray-500'>{post.posting.jobDescription}</p>
				</div>
				<div className='my-5 flex flex-col gap-2'>
					<h1 className='font-semibold text-lg'>Benefits</h1>
					<p className='text-gray-500'>{post.posting.benefits}</p>
				</div>
				<div className='my-5 flex flex-col gap-2'>
					<h1 className='font-semibold text-lg'>Availability</h1>
					<div className='h-[500px] overflow-auto pr-1'>
						<AvailabilityWidget availability={availability} />
					</div>
				</div>
				<PostedDate date={post.posting.createdAt} />
			</div>
		);
	};

	return (
		<div className='bg-white rounded-md border border-gray-200 mt-1 sticky top-[80px] max-h-[90vh] overflow-auto'>
			<CompanyCard />
			<PostBody post={post} />
		</div>
	);
};

export const MemoizedPost = memo(Post);
