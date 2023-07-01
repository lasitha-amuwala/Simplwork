import React from 'react';
import Link from 'next/link';
import { PostSkeleton } from '../Skeletons/PostSkeleton';
import { MemoizedPost } from './Post';

type PostListProps = {
	posts: any[];
	isLoading: boolean;
	selectedPost: number;
};

export const PostsList = ({ posts, isLoading, selectedPost }: PostListProps) => {
	if (isLoading) return [...Array(20).fill(0)].map((key, i) => <PostSkeleton key={i} />);
	return (
		<>
			{posts.map(({ posting, candidateStatus }: any, i: number) => (
				<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
					<MemoizedPost post={posting} status={candidateStatus} active={selectedPost === i} />
				</Link>
			))}
		</>
	);
};
