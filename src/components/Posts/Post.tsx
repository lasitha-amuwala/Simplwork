import React, { memo } from 'react';
import { PostSkeleton } from '../Skeletons/PostSkeleton';
import { useMutation } from '@tanstack/react-query';
import { SimplworkApi } from '@/src/utils/simplwork';
import { PostedDate } from './PostedDate';

type PostProps = {
	posts: any;
	selectedPost: number;
	isLoading: boolean;
};

export const Post = ({ posts, selectedPost, isLoading }: PostProps) => {
	const applyToPost = async (data: any) => {
		console.log(JSON.stringify(data));
		const res = await SimplworkApi.post(`candidate/postings/setStatus?id=${data.id}&status=${data.status}`);
		console.log('res', JSON.stringify(res.data, null, 2));
		return res;
	};

	const mutation = useMutation(applyToPost);

	if (isLoading) return <PostSkeleton />;
	const post = posts[selectedPost];

	const handleOnClick = () => {
		console.log('clicked: ', post.posting.id);
		mutation.mutate({ id: post.posting.id, status: 'APPLIED' });
		// console.log(post.posting.id);
	};

	const CompanyCard = () => {
		return (
			<div className='bg-[#64B1EC]/10 border-b p-4 '>
				<div className='h-auto flex gap-4'>
					<div className='h-20 w-20 bg-blue-300 rounded-md shrink-0'></div>
					<div className='grow'>
						<div className='flex'>
							<div className='flex flex-col grow'>
								<h1 className='font-semibold text-xl'>{post.posting.employer.companyName}</h1>
								<p className='font-normal text-lg '>{post.posting.employer?.branches[0].branchName}</p>
							</div>
							{!post.candidateStatus ? (
								<button className='btn-blue self-start' onClick={handleOnClick}>
									Apply
								</button>
							) : (
								<div className='bg-green-100 self-start text-green-600 font-medium px-2 py-1 rounded-md'>Applied</div>
							)}
						</div>
						<p className='text-md text-gray-500'>{post.posting.employer.companyDescription}</p>
					</div>
				</div>
			</div>
		);
	};

	const PostBody = () => {
		return (
			<div className='p-5'>
				<div>
					<div className='text-2xl font-semibold'>{`$${post.posting.pay}`}</div>
				</div>
				<div className='my-5 flex flex-col gap-2'>
					<h1 className='font-semibold text-lg'>Job Description</h1>
					<p className='text-gray-500'>{post.posting.jobDescription}</p>
				</div>
				<div className='my-5 flex flex-col gap-2'>
					<h1 className='font-semibold text-lg'>Benefits</h1>
					<p className='text-gray-500'>{post.posting.benefits}</p>
				</div>
				<div className='h-20 w-full p-5 bg-slate-100 rounded flex justify-center items-center'>Availability Widget</div>
				<PostedDate date={post.posting.createdAt} />
			</div>
		);
	};

	return (
		<div className='h-auto bg-white rounded-md border border-gray-200 mt-1 sticky top-[80px] overflow-hidden'>
			<CompanyCard />
			<PostBody />
		</div>
	);
};

export const MemoizedPost = memo(Post);
