import { memo } from 'react';
import { Card } from '@components/Card';
import { PostBody } from './PostBody';
import { CompanyHeaderCard } from './PostCompanyHeader';
import { PostSkeleton } from './PostSkeleton';

type PostProps = { post: SW.PostingResponse; isLoading: boolean; isSuccess: boolean };

export const Post = memo(({ post, isLoading, isSuccess }: PostProps) => {
	return (
		<>
			{isLoading && <PostSkeleton />}
			{isSuccess && (
				<>
					{post ? (
						<Card className='sticky top-[80px] max-h-[90vh] overflow-auto p-0'>
							<CompanyHeaderCard post={post} />
							<PostBody post={post} />
						</Card>
					) : (
						<div className='w-full flex py-10 flex-col justify-center items-center rounded-xl bg-gray-200'>
							<p className='py-10 font-medium '>Post not available, Please try again</p>
						</div>
					)}
				</>
			)}
		</>
	);
});

Post.displayName = 'Post';
