import Link from 'next/link';
import { PostListItemSkeleton } from './Skeletons/PostListItemSkeleton';
import { MemoizedPostListItem } from './PostsListItem';
import { PostingResponse } from '@/src/types/api/candidate';

type PostListProps = {
	posts: PostingResponse[] | undefined;
	selectedPost: number;
};

export const PostList = ({ posts, selectedPost }: PostListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{posts?.map(({ posting, candidateStatus }: any, i: number) => (
				<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
					<MemoizedPostListItem post={posting} status={candidateStatus} active={selectedPost === i} />
				</Link>
			))}
		</div>
	);
};
