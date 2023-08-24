import { PostCard, PostCardSkeleton } from '@components/Posts/PostCard';
import { isError, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { queries } from '@utils/simplwork';
import { useAuth } from '@components/Auth/AuthProvider';
import { MdError, MdErrorOutline } from 'react-icons/md';
interface CandidateMatchResponse {
	posting: SW.IPosting;
	candidateStatus: string;
}

export const MatchStatusList = ({ status, label }: { status: string; label: string }) => {
	const { user } = useAuth();

	const { data, isError, isLoading } = useQuery<CandidateMatchResponse[]>(
		queries.candidate.getCandidatePostings(user?.credential as string, { requestStatusSet: status })
	);

	return (
		<div>
			<h1 className='text-3xl pl-1 font-bold'>{data?.length ? `${label} (${data.length})` : `${label} (0)`}</h1>
			<div className='flex gap-3 pt-5 overflow-x-auto p-1'>
				{isLoading ? (
					[...Array(3).fill(0)].map((key, i) => (
						<div key={`${key}-${i}`} className='min-w-[350px] w-full'>
							<PostCardSkeleton />
						</div>
					))
				) : isError ? (
					<div className='bg-gray-200 rounded-md w-full h-[218px] py-10 px-5 flex justify-center items-center text-xl font-medium gap-2'>
						<MdErrorOutline />
						There was an Error...
					</div>
				) : data.length > 0 ? (
					data?.map(({ posting, candidateStatus }) => (
						<Link
							href={{ pathname: '/applications', query: { status: status.toLowerCase(), id: posting.id } }}
							key={`${posting.id}`}
							className='min-w-[350px] w-full'>
							<PostCard post={posting} status={candidateStatus} />
						</Link>
					))
				) : (
					<div className='bg-gray-200 rounded-md w-full h-[218px] py-10 px-5 flex flex-col justify-center items-center'>
						<p className='py-10'>No applications.</p>
					</div>
				)}
			</div>
		</div>
	);
};
