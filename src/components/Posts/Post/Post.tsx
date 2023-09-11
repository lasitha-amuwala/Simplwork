import { memo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { CommutePostTags } from '../PostTags/CommutePostTags';
import { PostBody } from './PostBody';
import axios from 'axios';
import { unEscape } from '@utils/helpers';
import { Card } from '@components/Card';

type PostProps = {
	post: SW.PostingResponse;
	refetch: () => Promise<void>;
};

const setPostingStatus = ({ id, status }: { id: number; status: string }) => {
	return SimplworkApi.post(`candidate/postings/setStatus?id=${id.toString()}&status=${status}`);
};

export const Post = memo(({ post, refetch }: PostProps) => {
	const isMatch = !!post.candidateStatus;
	// run setStatus mutation, refetch post list on success, handle errors
	const { mutate } = useMutation({
		mutationFn: setPostingStatus,
		onSuccess: () => refetch(),
		onError: (error) => {
			if (axios.isAxiosError(error))
				if (error.response?.status) alert('Unable to apply to job: your availability do not match the required job schedule');
				else alert('Something went wrong. Please try again.');
		},
	});

	const onStatusChangeClick = (status: string) => mutate({ id: post.posting.id, status: status });

	const CompanyHeaderCard = () => {
		return (
			<div className='bg-[#64B1EC]/10 border-b p-5 flex flex-col gap-4 overflow-auto'>
				<div className='h-auto flex gap-4'>
					<div className='h-20 w-20 bg-blue-300 rounded-md shrink-0' />
					<div className='grow'>
						<div className='flex'>
							<div className='flex flex-col grow'>
								<h1 className='font-semibold text-xl'>{post.posting.employer.companyName}</h1>
								<p className='font-medium text-lg  '>{post.posting.employer?.branches[0].branchName}</p>
								<span className='font-normal text-gray-600'>{post.posting.employer?.branches[0].location.fullAddress}</span>
							</div>
							{!post.candidateStatus || post.candidateStatus === 'WITHDRAWN' ? (
								<button className='btn-blue self-start' onClick={() => onStatusChangeClick('APPLIED')}>
									Apply
								</button>
							) : (
								<button className='btn-red self-start' onClick={() => onStatusChangeClick('WITHDRAWN')}>
									Withdraw
								</button>
							)}
						</div>
					</div>
				</div>
				<p className='text-md text-gray-600'>{unEscape(post.posting.employer.companyDescription)}</p>
				{isMatch && (
					<CommutePostTags
						distance={post.distance}
						CarCommuteTime={post.carCommuteTime}
						bikeCommuteTime={post.bikeCommuteTime}
						walkCommuteTime={post.walkCommuteTime}
					/>
				)}
			</div>
		);
	};

	return (
		<Card className='mt-1 sticky top-[80px] max-h-[90vh] overflow-auto p-0'>
			<CompanyHeaderCard />
			<PostBody post={post} />
		</Card>
	);
});

Post.displayName = 'Post';
