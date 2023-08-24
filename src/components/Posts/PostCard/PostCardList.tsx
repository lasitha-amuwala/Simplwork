import Link from 'next/link';
import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';

type PostCardListProps = {
	posts: SW.PostingResponse[] | undefined;
	selectedPost: number;
	isLoading: boolean;
};

export const PostCardList = ({ posts, selectedPost, isLoading }: PostCardListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{isLoading
				? [...Array(10).fill(0)].map((_key, i) => <PostCardSkeleton key={i} />)
				: posts?.map(({ posting, candidateStatus }: SW.PostingResponse, i: number) => (
						<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
							<PostCard post={posting} status={candidateStatus} active={selectedPost === i} />
						</Link>
				  ))}
		</div>
	);
};
