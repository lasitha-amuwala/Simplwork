import React from 'react';
import Link from 'next/link';
import { PostListItemSkeleton } from '../Skeletons/PostsListItemSkeleton';
import { MemoizedPostsListItem } from './PostsListItem';

type PostListProps = {
	posts: any[];
	isLoading: boolean;
	selectedPost: number;
};

export const PostsList = ({ posts, isLoading, selectedPost }: PostListProps) => {
	if (isLoading) return [...Array(20).fill(0)].map((_key, i) => <PostListItemSkeleton key={i} />);
	return (
		<div className='flex flex-col gap-3'>
			{posts.map(({ posting, candidateStatus }: any, i: number) => (
				<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
					<MemoizedPostsListItem post={posting} status={candidateStatus} active={selectedPost === i} />
				</Link>
			))}
		</div>
	);
};
