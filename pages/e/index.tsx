import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { Card } from '@components/Card';
import { DeletePostingDialog } from '@components/Dialogs/DeletePostingDialog';
import DialogContent, { Dialog } from '@components/Dialogs/Dialog';
import { PostingEditDialog } from '@components/Dialogs/PostingEditDIalog';
import { ErrorTryAgain } from '@components/ErrorTryAgain';
import { PostOverviewDialogContent } from '@components/PostOverviewDialogContent';
import { CreatePostingDialog } from '@components/Posts/CreatePostingDialog';
import { PostOverview } from '@components/Posts/employer/PostOverview';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user, employerName } = useAuth();
	const params = {};

	const [buttonState, setButtonState] = useState(0);

	const router = useRouter();
	const overviewId = parseInt(router.query.id as string);

	const onOpenChange = (isOpen: boolean) => {
		if (isOpen == false) setButtonState(0);
		router.push('');
	};

	const { data, isLoading, isSuccess, isError } = useQuery({
		...queries.employer.postings.getOverviews(user?.credential ?? '', employerName as string, params),
		refetchInterval: 30000,
	});

	if (!employerName) return <ErrorTryAgain />;

	return (
		<>
			<Head>
				<title>Home - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<main className='flex justify-center pt-7 w-full '>
					<div className='max-w-2xl p-1.5 w-full flex flex-col gap-3 justify-center items-center overflow-y-auto'>
						<div className='self-end'>
							<CreatePostingDialog />
						</div>
						{isLoading &&
							Array(10)
								.fill(0)
								.map((v, i) => (
									<div className='px-1.5 w-full' key={i}>
										<Card className='h-[202px] p-5'>loading...</Card>
									</div>
								))}
						{isError && <ErrorTryAgain />}
						{isSuccess &&
							(data ? (
								data?.map(({ jobPosting, new_count, reviewed_count, interview_requested_count, ready_for_interview_count, rejected_count }) => (
									<Link href={{ pathname: '/e/', query: { id: jobPosting.id } }} key={jobPosting.id} className='w-full'>
										<PostOverview
											post={jobPosting}
											newCount={new_count}
											reviewedCount={reviewed_count}
											interviewRequestedCount={interview_requested_count}
											readyForInterviewCount={ready_for_interview_count}
											rejectedCount={rejected_count}
										/>
									</Link>
								))
							) : (
								<div className='bg-gray-200 w-[672px] rounded-lg py-10 px-5 flex flex-col justify-center items-center'>
									<p className=''>You have no posts to display.</p>
									<p>
										Click <span className='font-semibold'>Create Job Posting</span> to continue.
									</p>
								</div>
							))}
					</div>
				</main>
				{buttonState == 0 && (
					<Dialog open={!!overviewId} onOpenChange={onOpenChange}>
						<DialogContent className='h-auto w-[300px] bg-gray-50 flex flex-col gap-3'>
							<Link href={`?${new URLSearchParams({ id: router.query.id as string, action: 'manage' })}`} shallow className='button text-center'>
								Manage Applications
							</Link>
							<PostingEditDialog id={overviewId} data={data} />
							<DeletePostingDialog id={overviewId} />
						</DialogContent>
					</Dialog>
				)}
				{router.query.action == 'manage' && (
					<Dialog open={!!overviewId} onOpenChange={onOpenChange}>
						<DialogContent className='h-auto max-w-5xl bg-gray-50'>
							<PostOverviewDialogContent id={overviewId} />
						</DialogContent>
					</Dialog>
				)}
				{router.query.action == 'edit' && <div className='h-auto max-w-5xl bg-gray-50'></div>}
			</ProtectedPage>
		</>
	);
};

export default Home;
