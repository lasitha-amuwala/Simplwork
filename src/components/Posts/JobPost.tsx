import React, { memo } from 'react';
import { JobPostSkeleton } from '../Skeletons/JobPostSkeleton';

type JobPostSkeletonProps = {
	posts: any;
	selectedPost: number;
	isLoading: boolean;
};

export const JobPost = ({ posts, selectedPost, isLoading }: JobPostSkeletonProps) => {
	if (isLoading) return <JobPostSkeleton />;
	const post = posts[selectedPost];
	return (
		<div className='h-auto bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px] overflow-hidden'>
			<div className='h-28 bg-[#64B1EC]/10 flex items-center p-4 gap-4'>
				<div className='h-20 w-20 bg-blue-300 rounded-md'></div>
				<div className='h-full'>
					<h1 className='font-semibold text-xl'>{post.posting.employer.companyName}</h1>
					<p>{post.posting.employer.companyDescription}</p>
				</div>
			</div>
			<div className='p-5 flex flex-col gap-2'>
				<h1 className='font-semibold text-lg'>Job Description</h1>
				<p className='text-gray-500'>{post.posting.jobDescription}</p>
			</div>
		</div>
	);
};

export const MemoizedJobPost = memo(JobPost);
