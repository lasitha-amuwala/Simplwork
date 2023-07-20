import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { PostListItem } from '@/src/components/Posts/PostsListItem';
import { queries } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';

type Props = {};

const Applications: NextPage = (props: Props) => {
	const { user } = useAuth();
	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidatePostings(user?.credential ?? ''));

	if (isLoading) return <div>loading</div>;
	if (isError) return <div>error</div>;
	return (
		<ProtectedPage>
			<div className='flex mx-5 gap-2'>
				<div className='flex flex-col gap-10 items-center justify-center w-full h-full pt-20'>
					{candidate && (
						<div className='w-full flex flex-col gap-4 max-w-2xl'>
							<h1 className='text-3xl font-bold px-1'>{`Applied (${candidate.length})`}</h1>
							<div className='w-full flex flex-col overflow-y-auto max-h-[1000px] p-1 gap-4'>
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
				<div className='flex flex-col gap-10 items-center justify-center w-full h-full pt-20'>
					{candidate && (
						<div className='w-full flex flex-col gap-4 max-w-2xl'>
							<h1 className='text-3xl font-bold px-1'>{`Interview (${candidate.length})`}</h1>
							<div className='w-full flex flex-col overflow-y-auto max-h-[1000px] p-1 gap-4'>
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
				<div className='flex flex-col gap-10 items-center justify-center w-full h-full pt-20'>
					{candidate && (
						<div className='w-full flex flex-col gap-4 max-w-2xl'>
							<h1 className='text-3xl font-bold px-1'>{`Withdrawn (${candidate.length})`}</h1>
							<div className='w-full flex flex-col overflow-y-auto max-h-[1000px] p-1 gap-4'>
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
			</div>
		</ProtectedPage>
	);
};

export default Applications;
