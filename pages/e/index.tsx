import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { CreatePostingDialog } from '@components/Posts/CreatePostingDialog';
import { PostOverview } from '@components/Posts/employer/PostOverview';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Home: NextPage = (props: Props) => {
	const { user } = useAuth();
	const params = {};
	const employerName = 'LasithaA';

	const { data } = useQuery({
		...queries.employer.postings.getOverviews(user?.credential ?? '', employerName, params),
		refetchInterval: 10000,
	});

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
						{data?.map(({ jobPosting, new_count, reviewed_count, interview_requested_count, ready_for_interview_count, rejected_count }) => (
							<PostOverview
								post={jobPosting}
								newCount={new_count}
								reviewedCount={reviewed_count}
								interviewRequestedCount={interview_requested_count}
								readyForInterviewCount={ready_for_interview_count}
								rejectedCount={rejected_count}
							/>
						))}
					</div>
				</main>
			</ProtectedPage>
		</>
	);
};

export default Home;
