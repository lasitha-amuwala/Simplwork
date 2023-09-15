import { Card } from '@components/Card';
import { DeletePostingDialog } from '@components/Dialogs/DeletePostingDialog';
import { timeFromNow } from '@utils/helpers';
import React from 'react';

type PostOverviewProps = {
	post: SW.Employer.Postings.IJobPosting;
	newCount: number;
	reviewedCount: number;
	interviewRequestedCount: number;
	readyForInterviewCount: number;
	rejectedCount: number;
};

export const PostOverview = ({
	post,
	newCount,
	reviewedCount,
	interviewRequestedCount,
	readyForInterviewCount,
	rejectedCount,
}: PostOverviewProps) => {
	const DataDisplay = ({ text, value }: { text: string; value: number }) => {
		return (
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-bold text-sw-500'>{value}</h1>
				<p className='font-medium'>{text}</p>
			</div>
		);
	};

	return (
		<Card className='flex flex-col gap-4 w-full group/postOverview hover:cursor-pointer ring-sw hover:ring ring-2 select-none'>
			<div>
				<h1 className='font-semibold text-lg'>{post.positionTitle}</h1>
				<p className='font-medium text-md'>
					{post.branch.branchName} - <span className='text-gray-500 font-normal'>{post.branch.location.addressComponents?.place}</span>
				</p>
			</div>
			<div className='flex justify-between gap-7'>
				<DataDisplay value={newCount} text='New' />
				<DataDisplay value={reviewedCount} text='Reviewed' />
				<DataDisplay value={interviewRequestedCount} text='Interview Requested' />
				<DataDisplay value={readyForInterviewCount} text='Ready For Interview' />
				<DataDisplay value={rejectedCount} text='Rejected' />
			</div>
			<p className='text-sm text-gray-500'>{timeFromNow(new Date(post.createdAt))}</p>
		</Card>
	);
};
