import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import DialogContent, { Dialog } from '@components/Dialogs/Dialog';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
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
	const employerName = 'Employer';
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (router.query.id) {
			router.query.id;
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [router]);

	const { data: employer } = useQuery({ ...queries.user.employerList(user?.credential ?? '') });
	const { data } = useQuery({
		...queries.employer.postings.getOverviews(user?.credential ?? '', employerName, params),
		refetchInterval: 10000,
	});

	// const data: SW.Employer.Postings.IOverview[] = [
	// 	{
	// 		jobPosting: {
	// 			pay: 15,
	// 			positionTitle: 'Backend Dev',
	// 			jobDescription: 'Testing Tests',
	// 			benefits: 'Test',
	// 			createdAt: new Date(),
	// 			shifts: [
	// 				{
	// 					dayOfWeek: 1,
	// 					shiftTimes: {
	// 						startTime: 300,
	// 						endTime: 1100,
	// 					},
	// 					id: 1,
	// 				},
	// 			],
	// 			isFixedSchedule: true,
	// 			estimatedHours: 10,
	// 			id: 0,
	// 			branch: {
	// 				branchName: 'Lasi',
	// 			},
	// 		},
	// 		new_count: 10,
	// 		reviewed_count: 11,
	// 		interview_requested_count: 12,
	// 		ready_for_interview_count: 13,
	// 		rejected_count: 14,
	// 	},
	// ];

	return (
		<>
			<Head>
				<title>Home - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<main className='flex justify-center pt-7 w-full'>
					<div className='flex flex-col gap-3 justify-center items-center overflow-y-auto max-w-2xl'>
						<div className='self-end'>
							<CreatePostingDialog />
						</div>
						{data?.length == 0 && (
							<div className='bg-gray-200 rounded-lg w-full py-10 px-5 flex flex-col justify-center items-center'>
								<p className=''>You have no posts to display.</p>
								<p>
									Click <span className='font-semibold'>Create Job Posting</span> to continue.
								</p>
							</div>
						)}
						{data?.map(({ jobPosting, new_count, reviewed_count, interview_requested_count, ready_for_interview_count, rejected_count }) => (
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
						))}
					</div>
				</main>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent>
						<PostOverviewDialogContent />
					</DialogContent>
				</Dialog>
			</ProtectedPage>
		</>
	);
};

export default Home;
