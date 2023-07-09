import React, { memo } from 'react';
import { JobPostSkeleton } from '../Skeletons/JobPostSkeleton';
import { useMutation } from '@tanstack/react-query';
import { SimplworkApi } from '@/src/utils/simplwork';

type JobPostSkeletonProps = {
	posts: any;
	selectedPost: number;
	isLoading: boolean;
};

export const JobPost = ({ posts, selectedPost, isLoading }: JobPostSkeletonProps) => {
	if (isLoading) return <JobPostSkeleton />;
	const post = posts[selectedPost];

	// const applyToPost = async (id: string, status: string) => {
	// 	return await SimplworkApi.post(`candidate/postings/setStatus?id=${id}&status=${status}`).then((res) => res.data);
	// };

	// const mutation = useMutation(async ({ id, status }) => {
	// 	return applyToPost(id, status);
	// });

	const handleOnClick = () => {
		// mutation.mutate({ id: post.posting.id, status: 'APPLIED' });
		// console.log(post.posting.id);
	};

	return (
		<div className='h-auto bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px] overflow-hidden'>
			<div className='h-28 bg-[#64B1EC]/10 flex items-center p-4 gap-4 border-b'>
				<div className='h-20 w-20 bg-blue-300 rounded-md'></div>
				<div className='h-full grow'>
					<h1 className='font-semibold text-xl'>{post.posting.employer.companyName}</h1>
					<p>{post.posting.employer.companyDescription}</p>
				</div>
				{!post.candidateStatus ? (
					<button className='btn-blue self-start' onClick={handleOnClick}>
						Apply
					</button>
				) : (
					<div className='bg-green-100 self-start text-green-500 font-medium px-2 py-1 rounded-md'>Applied</div>
				)}
			</div>
			<div className='p-5 flex flex-col gap-2'>
				<h1 className='font-semibold text-lg'>Job Description</h1>
				<p className='text-gray-500'>{post.posting.jobDescription}</p>
			</div>
		</div>
	);
};

export const MemoizedJobPost = memo(JobPost);
