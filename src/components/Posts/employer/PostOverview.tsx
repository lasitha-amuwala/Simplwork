import { Card } from '@components/Card';
import { timeFromNow } from '@utils/helpers';
import React from 'react';

type PostOverviewProps = {
	post: SW.Employer.Postings.IJobPosting;
	newCount: number;
	reviewedCount: number;
	shortlistedCount: number;
	interviewRequestedCount: number;
	readyForInterviewCount: number;
	rejectedCount: number;
};

export const PostOverview = ({
	post,
	newCount,
	reviewedCount,
	shortlistedCount,
	interviewRequestedCount,
	readyForInterviewCount,
	rejectedCount,
}: PostOverviewProps) => {
	const DataDisplay = ({ text, value }: { text: string; value: number }) => {
		return (
			<h1 className='font-bold text-3xl text-black'>
				{value}
				<span className='font-medium text-gray-500 text-base pl-2 whitespace-nowrap'>{text}</span>
			</h1>
		);
	};

	return (
		<Card className='flex flex-col gap-3 w-full group/postOverview hover:cursor-pointer ring-sw hover:ring ring-2 select-none'>
			<div className='flex flex-col'>
				<h1 className='font-bold text-xl'>{post.positionTitle}</h1>
				<p className='font-medium text-lg text-gray-600'>{post.branch.branchName}</p>
				<p className='text-gray-500 font-normal text-lg'>{post.branch.location.fullAddress}</p>
			</div>
			<div className='flex flex-col sm:flex-row gap-1 sm:gap-x-10 flex-wrap'>
				<DataDisplay value={newCount} text='New' />
				<DataDisplay value={reviewedCount} text='Reviewed' />
				<DataDisplay value={shortlistedCount} text='ShortListed' />
				<DataDisplay value={interviewRequestedCount} text='Interview Requested' />
				<DataDisplay value={readyForInterviewCount} text='Ready For Interview' />
				<DataDisplay value={rejectedCount} text='Rejected' />
			</div>
			<p className='text-sm text-gray-500'>{timeFromNow(new Date(post.createdAt))}</p>
		</Card>
	);
};
