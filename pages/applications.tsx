import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { PostListItem } from '@/src/components/Posts/PostsListItem';
import { PostItemSkeleton } from '@/src/components/Posts/Skeletons/PostItemSkeleton';
import { Posting } from '@/src/types/api/candidate';
import { queries } from '@/src/utils/simplwork';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';

type Props = {};

interface CandidateMatchResponse {
	posting: Posting;
	candidateStatus: string;
}

const Applications: NextPage = (props: Props) => {
	const { user } = useAuth();

	const appliedQuery = useQuery<CandidateMatchResponse[]>(
		queries.candidate.getCandidatePostings(user?.credential as string, { requestStatusSet: 'APPLIED' })
	);
	const interviewQuery = useQuery<CandidateMatchResponse[]>(
		queries.candidate.getCandidatePostings(user?.credential as string, { requestStatusSet: 'ACCEPT_INTERVIEW' })
	);
	const withdrawnQuery = useQuery<CandidateMatchResponse[]>(
		queries.candidate.getCandidatePostings(user?.credential as string, { requestStatusSet: 'WITHDRAWN' })
	);

	return (
		<ProtectedPage>
			<div className='w-full h-full py-10'>
				<div className='flex flex-col gap-10'>
					<MatchStatusList data={appliedQuery} label='Applied' />
					<MatchStatusList data={interviewQuery} label='Interviews' />
					<MatchStatusList data={withdrawnQuery} label='Withdrawn' />
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Applications;

const MatchStatusList = ({ data: query, label }: { data: UseQueryResult<CandidateMatchResponse[], unknown>; label: string }) => {
	return (
		<div>
			<h1 className='text-3xl pl-1 font-bold'>{query.data?.length ? `${label} (${query.data.length})` : `${label} (0)`}</h1>
			<div className='flex gap-3 pt-5 overflow-x-auto p-1'>
				{query.isLoading &&
					[...Array(3).fill(0)].map((key, i) => (
						<div key={`${key}-${i}`} className='min-w-[350px] w-full'>
							<PostItemSkeleton />
						</div>
					))}
				{query.isSuccess &&
					(query.data.length > 0 ? (
						query.data?.map(({ posting, candidateStatus }) => (
							<div key={`${posting.id}`} className='min-w-[350px] w-full'>
								<PostListItem post={posting} status={candidateStatus} />
							</div>
						))
					) : (
						<div className='bg-gray-200 w-full py-10 px-5 flex flex-col justify-center items-center rounded'>
							<p className='py-10'>No applications.</p>
						</div>
					))}
			</div>
		</div>
	);
};
{
	/* <div className='flex flex-col mx-5 gap-10 pt-20 '>
<div className='flex flex-col gap-10 items-center justify-center  w-full h-full '>
	{candidate && (
		<div className='w-full flex flex-col gap-4 '>
			<h1 className='text-3xl font-bold px-1'>{`Applied (${candidate.length})`}</h1>
			<div className='w-full flex overflow-y-auto max-h-[1000px] p-1 gap-4'>
				{candidate.map(({ posting, candidateStatus }: any, i: number) => {
					return (
						<div key={`${posting.id}${i}`} className='w-full flex'>
							<PostListItem post={posting} status={candidateStatus} />
						</div>
					);
				})}
			</div>
		</div>
	)}
</div>
</div> */
}
