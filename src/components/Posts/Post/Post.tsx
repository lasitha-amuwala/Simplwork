import { memo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { CommutePostTags } from '../PostTags/CommutePostTags';
import { PostBody } from './PostBody';

type PostProps = {
	post: SW.PostingResponse;
};

const applyToPost = async (data: any) => {
	console.log(JSON.stringify(data));
	const res = await SimplworkApi.post(`candidate/postings/setStatus?id=${data.id.toString()}&status=APPLIED`);
	console.log('res', JSON.stringify(res.data, null, 2));
	return res;
};

export const Post = memo(({ post }: PostProps) => {
	const mutation = useMutation({ mutationFn: applyToPost });

	const isMatch = !!post.candidateStatus;

	const handleOnClick = () => {
		console.log('clicked: ', post.posting.id);
		mutation.mutate({ id: post.posting.id, status: 'APPLIED' });
		// console.log(post.posting.id);
	};

	const CompanyCard = () => {
		return (
			<div className='bg-[#64B1EC]/10 border-b p-4 flex flex-col gap-4 overflow-auto'>
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
								<div>
									<div className='bg-green-100 self-start text-green-600 font-medium px-2 py-1 rounded-md'>Applied</div>
									<button className='btn-blue self-start' onClick={handleOnClick}>
										Widthdraw
									</button>
								</div>
							)}
						</div>
						<p className='text-md text-gray-500'>{post.posting.employer.companyDescription}</p>
					</div>
				</div>
				{isMatch && (
					<CommutePostTags
						distance={post.distance}
						CarCommuteTime={post.carCommuteTime}
						bikeCommuteTime={post.bikeCommuteTime}
						walkCommuteTime={post.walkCommuteTime}
					/>
				)}
			</div>
		);
	};

	return (
		<div className='bg-white rounded-md border border-gray-200 mt-1 sticky top-[80px] max-h-[90vh] overflow-auto'>
			<CompanyCard />
			<PostBody post={post} />
		</div>
	);
});

Post.displayName = 'Post';
