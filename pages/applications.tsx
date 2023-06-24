import { useAuth } from '@/src/components/Auth/AuthProvider';
import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { Post } from '@/src/components/Post';
import { PostTag } from '@/src/components/PostTag';
import { simplwork } from '@/src/utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { MdAttachMoney } from 'react-icons/md';

type Props = {};

const Applications: NextPage = (props: Props) => {
	const { user } = useAuth();
	const { data: candidate, isLoading } = useQuery(simplwork.candidate.getCandidatePostings(user?.credential as string));

	return (
		<ProtectedPage>
			<div className='flex flex-col gap-10 items-center justify-center w-full h-full pt-20'>
				{candidate && (
					<div className='w-full flex flex-col gap-5 max-w-2xl'>
						<h1 className='text-3xl font-bold px-1'>{`Applied (${candidate.length})`}</h1>
						<div className='w-full flex flex-col overflow-y-scroll max-h-96 p-1 gap-5'>
							{candidate.map(({ posting, candidateStatus }: any, i: number) => {
								return (
									<div key={`${posting.id}${i}`} className='w-full flex'>
										<Post post={posting} status={candidateStatus}></Post>
									</div>
								);
							})}
						</div>
					</div>
				)}
				{candidate && (
					<div className='w-full flex flex-col gap-5 max-w-2xl'>
						<h1 className='text-3xl font-bold px-1'>{`Applied (${candidate.length})`}</h1>
						<div className='w-full flex flex-col overflow-y-scroll max-h-96 p-1 gap-5'>
							{candidate.map(({ posting, candidateStatus }: any, i: number) => {
								return (
									<div key={`${posting.id}${i}`} className='w-full flex'>
										<Post post={posting} status={candidateStatus}></Post>
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
