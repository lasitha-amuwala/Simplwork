import Link from 'next/link';
import { PostListItemSkeleton } from './Skeletons/PostListItemSkeleton';
import { MemoizedPostListItem } from './PostsListItem';

type PostListProps = {
	posts: any[];
	isLoading: boolean;
	selectedPost: number;
};

export const PostList = ({ posts, isLoading, selectedPost }: PostListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{isLoading
				? [...Array(20).fill(0)].map((_key, i) => <PostListItemSkeleton key={i} />)
				: posts.map(({ posting, candidateStatus }: any, i: number) => (
						<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
							<MemoizedPostListItem post={posting} status={candidateStatus} active={selectedPost === i} />
						</Link>
				  ))}
		</div>
	);
};
