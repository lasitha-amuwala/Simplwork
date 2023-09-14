import Link from 'next/link';
import { PostPreview } from './PostPreview';
import { PostPreviewSkeleton } from './PostPreviewSkeleton';

type PostPreviewListProps = {
	posts: SW.PostingResponse[];
	selectedPost: number;
	isLoading: boolean;
	isSuccess: boolean;
};

export const PostPreviewList = ({ posts, selectedPost, isLoading, isSuccess }: PostPreviewListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{isLoading && [...Array(10).fill(0)].map((_key, i) => <PostPreviewSkeleton key={i} />)}
			{isSuccess && (
				<>
					{posts.length > 0 ? (
						posts.map(({ posting, candidateStatus }: SW.PostingResponse, i: number) => (
							<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
								<PostPreview post={posting} status={candidateStatus} active={selectedPost === i} />
							</Link>
						))
					) : (
						<div className='w-full flex flex-col justify-center items-center rounded-xl bg-gray-200'>
							<p className='py-10 font-medium '>No Posts available, Please try again</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};
