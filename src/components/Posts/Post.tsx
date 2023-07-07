import { memo } from 'react';
import { PostTag } from './PostTag';
import { MdAttachMoney } from 'react-icons/md';

type PostProps = {
	post: any;
	status: string;
	active?: boolean;
};

export const Post = ({ post, status, active }: PostProps) => {
	return (
		<div
			className={`w-full h-auto  bg-white rounded-md border border-gray-200 p-4 text-start ring-sw hover:ring ${
				active && 'ring'
			} transition-shadow duration-150`}>
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-4'>
					{/* <div className='w-[50px] h-[50px] bg-sky-300 rounded-md'></div> */}
					<div className='flex flex-col flex-grow'>
						<h5 className='font-semibold'>{post.positionTitle}</h5>
						<p className='font-medium text-gray-500'>{post.employer.companyName}</p>
					</div>
					<div className=''>
						{status && status === 'APPLIED' ? (
							<div className='bg-green-100 text-green-500 text-sm font-medium px-2 py-1 rounded-md'>Applied</div>
						) : (
							<button className='bg-sw-50 text-sw-400 text-sm font-medium px-2 py-1 rounded-md'>Click to apply</button>
						)}
					</div>
				</div>
				<div className='flex gap-2 w-full'>
					<PostTag text={`$${post.pay}/hr`} icon={<MdAttachMoney />} />
					<PostTag text={`$${post.pay}/hr`} icon={<MdAttachMoney />} />
				</div>
				<p className='w-full text-gray-600 line-clamp-2'>{post.jobDescription}</p>
			</div>
		</div>
	);
};

export const MemoizedPost = memo(Post);
