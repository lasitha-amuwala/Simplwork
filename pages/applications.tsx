import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { Post } from '@/src/components/Posts/Post';
import { queries } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const Applications: NextPage = (props: Props) => {
	const { user } = useAuth();
	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidatePostings(user?.credential ?? ''));

	if (isLoading) return <div>loading</div>;
	if (isError) return <div>error</div>;
	return (
		<ProtectedPage>
			<div className='flex flex-col gap-10 items-center justify-center w-full h-full pt-20'>
				{candidate && (
					<div className='w-full flex flex-col gap-5 max-w-2xl'>
						<h1 className='text-3xl font-bold px-1'>{`Applied (${candidate.length})`}</h1>
						<div className='w-full flex flex-col overflow-y-scroll max-h-[500px] p-1 gap-5'>
							{candidate.map(({ posting, candidateStatus }: any, i: number) => {
								return (
									<div key={`${posting.id}${i}`} className='w-full flex'>
										<Post post={posting} status={candidateStatus} />
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</ProtectedPage>
	);
};

export default Applications;
