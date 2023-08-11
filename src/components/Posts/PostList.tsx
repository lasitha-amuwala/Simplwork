import Link from 'next/link';
import { PostItemSkeleton } from './Skeletons/PostItemSkeleton';
import { MemoizedPostListItem } from './PostsListItem';
import { PostingResponse } from '@/src/types/api/candidate';

type PostListProps = {
	posts: PostingResponse[] | undefined;
	selectedPost: number;
	isLoading: boolean;
};

export const PostList = ({ posts, selectedPost, isLoading }: PostListProps) => {
	if (!isLoading && posts) {
		if (posts.length <= 1) {
			return <div>noData</div>;
		}
	}
	return (
		<div className='flex flex-col gap-4'>
			{isLoading && [...Array(10).fill(0)].map((_key, i) => <PostItemSkeleton key={i} />)}
			{!isLoading &&
				posts &&
				posts?.map(({ posting, candidateStatus }: any, i: number) => (
					<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
						<MemoizedPostListItem post={posting} status={candidateStatus} active={selectedPost === i} />
					</Link>
				))}
		</div>
	);
};

