import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { DeletePostingDialog } from '@components/Dialogs/DeletePostingDialog';
import DialogContent, { Dialog } from '@components/Dialogs/Dialog';
import { PostOverviewDialogContent } from '@components/PostOverviewDialogContent';
import { CreatePostingDialog } from '@components/Posts/CreatePostingDialog';
import { PostOverview } from '@components/Posts/employer/PostOverview';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user } = useAuth();
	const params = {};
	const employerName = 'Lasitha';
	const [open, setOpen] = useState(false);
	const [buttonState, setButtonState] = useState(0);

	const router = useRouter();
	const overviewId = parseInt(router.query.id as string);
	useEffect(() => {
		if (router.query.id) {
			router.query.id;
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [router]);

	const onOpenChange = (isOpen: boolean) => {
		if (isOpen == false) setButtonState(0);
		setOpen(isOpen);
	};

	// const { data: employer } = useQuery(queries.user.employerList(user?.credential ?? ''));
	const { data } = useQuery({
		...queries.employer.postings.getOverviews(user?.credential ?? '', employerName, params),
		refetchInterval: 30000,
	});

	return (
		<>
			<Head>
				<title>Home - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<main className='flex justify-center pt-7 w-full'>
					<div className='max-w-2xl flex flex-col gap-3 justify-center items-center overflow-y-auto'>
						<div className='self-end'>
							<CreatePostingDialog />
						</div>
						{data ? (
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
						)}
					</div>
				</main>
				<Dialog open={open} onOpenChange={onOpenChange}>
					{buttonState == 0 && (
						<DialogContent className='h-auto w-[300px] bg-gray-50 flex flex-col gap-3'>
							<button className='button' onClick={() => setButtonState(1)}>
								View Applications
							</button>
							<button className='button' onClick={() => setButtonState(2)}>
								Edit Posting
							</button>
							<button className='btn-red' onClick={() => setButtonState(3)}>
								Delete Posting
							</button>
						</DialogContent>
					)}
					{buttonState == 1 && (
						<DialogContent className='h-auto max-w-5xl bg-gray-50'>
							<PostOverviewDialogContent />;
						</DialogContent>
					)}
					{buttonState == 2 && (
						<DialogContent className='h-auto max-w-5xl bg-gray-50'>
							<div>coming soon</div>
						</DialogContent>
					)}
					{buttonState == 3 && (
						<DialogContent className='h-auto max-w-5xl bg-gray-50'>
							<DeletePostingDialog id={overviewId} />
						</DialogContent>
					)}
				</Dialog>
			</ProtectedPage>
		</>
	);
};
{
}
export default Home;
