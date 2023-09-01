import Link from 'next/link';
import { PostPreview } from './PostPreview';
import { PostPreviewSkeleton } from './PostPreviewSkeleton';

type PostPreviewListProps = {
	posts: SW.PostingResponse[] | undefined;
	selectedPost: number;
	isLoading: boolean;
};

export const PostPreviewList = ({ posts, selectedPost, isLoading }: PostPreviewListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{isLoading
				? [...Array(10).fill(0)].map((_key, i) => <PostPreviewSkeleton key={i} />)
				: posts?.map(({ posting, candidateStatus }: SW.PostingResponse, i: number) => (
						<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
							<PostPreview post={posting} status={candidateStatus} active={selectedPost === i} />
						</Link>
				  ))}
		</div>
	);
};
