import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';

import { Card } from '@components/Card';
import { useAuth } from '@components/Auth/AuthProvider';
import { ErrorTryAgain } from '@components/ErrorTryAgain';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import DialogContent, { Dialog } from '@components/Dialogs/Dialog';
import { PostOverview } from '@components/Posts/employer/PostOverview';
import { PostingCreateDialog } from '@components/Dialogs/Posting/PostingCreateDialog';
import { BaseDialogContent } from '@components/Dialogs/DialogContentLayout';
import { PostOverviewDialogContent } from '@components/PostOverviewDialogContent';
import { PostingEditForm } from '@components/Dialogs/Posting/PostingEditForm';
import { DeletePostingDialog } from '@components/Dialogs/Posting/PostingDeleteDialog';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user, employerName } = useAuth();
	const params = {};

	const [open, setOpen] = useState(false);

	const router = useRouter();
	const overviewId = parseInt(router.query.id as string);
	const action = router.query.action;

	const {
		data: overviews,
		isLoading,
		isSuccess,
		isError,
	} = useQuery({
		...queries.employer.postings.getOverviews(user?.credential ?? '', employerName as string, params),
		refetchInterval: 15000,
	});

	const { data: post } = useQuery(queries.employer.postings.getPostingByID(user?.credential ?? '', overviewId));

	useEffect(() => {
		const overviewExists = overviews?.some((overview) => overview.jobPosting.id == overviewId);
		if (overviewExists) setOpen(true);
	}, [overviewId, overviews]);

	const onOpenChange = (isOpen: boolean) => {
		if (isOpen == false) setOpen(false);
		router.push('');
	};

	return (
		<>
			<Head>
				<title>Home - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<main className='flex justify-center pt-7 w-full '>
					<div className='max-w-7xl p-1.5 w-full flex flex-col gap-3 justify-center items-center overflow-y-auto'>
						{isLoading &&
							Array(10)
								.fill(0)
								.map((v, i) => (
									<div className='px-1.5 w-full' key={i}>
										<Card className='h-[202px] p-5'>loading...</Card>
									</div>
								))}
						{isError && <ErrorTryAgain />}

						<div className='flex flex-col gap-3 w-auto'>
							<div className='self-end'>
								<PostingCreateDialog />
							</div>
							{isSuccess &&
								(overviews.length > 0 ? (
									overviews?.map(
										({ jobPosting, new_count, reviewed_count, interview_requested_count, ready_for_interview_count, rejected_count }) => (
											<Link href={{ pathname: '/e/', query: { id: jobPosting.id } }} key={jobPosting.id} className='w-full sm:w-auto'>
												<PostOverview
													post={jobPosting}
													newCount={new_count}
													reviewedCount={reviewed_count}
													shortlistedCount={0}
													interviewRequestedCount={interview_requested_count}
													readyForInterviewCount={ready_for_interview_count}
													rejectedCount={rejected_count}
												/>
											</Link>
										)
									)
								) : (
									<div className='bg-gray-200 w-[672px] rounded-lg py-10 px-5 flex flex-col justify-center items-center'>
										<p className=''>You have no posts to display.</p>
										<p>
											Click <span className='font-semibold'>Create Job Posting</span> to continue.
										</p>
									</div>
								))}
						</div>
					</div>
				</main>
				<Dialog open={open} onOpenChange={onOpenChange}>
					{action === 'manage' && (
						<DialogContent className='h-auto max-w-7xl bg-gray-50 flex flex-col gap-3'>
							<PostOverviewDialogContent id={overviewId} />
						</DialogContent>
					)}
					{action === 'edit' && (
						<BaseDialogContent title='Edit Posting' description={`Edit posting here. Click add when you're done`}>
							<PostingEditForm data={post as SW.IPosting} />
						</BaseDialogContent>
					)}
					{action === 'delete' && <DeletePostingDialog id={overviewId} />}
					{!action && (
						<DialogContent className='h-auto w-[300px] bg-gray-50 flex flex-col gap-3'>
							<Link href={`?${new URLSearchParams({ id: router.query.id as string, action: 'manage' })}`} shallow className='button text-center'>
								Manage Applications
							</Link>
							<Link href={`?${new URLSearchParams({ id: router.query.id as string, action: 'edit' })}`} shallow className='button text-center'>
								Edit Posting
							</Link>
							<Link href={`?${new URLSearchParams({ id: router.query.id as string, action: 'delete' })}`} shallow className='btn-red text-center'>
								Delete Posting
							</Link>
						</DialogContent>
					)}
				</Dialog>
			</ProtectedPage>
		</>
	);
};

export default Home;
