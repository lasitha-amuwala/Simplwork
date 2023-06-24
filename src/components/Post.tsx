import Link from 'next/link';
import { PostTag } from './PostTag';
import { MdAttachMoney } from 'react-icons/md';

export const Post = ({ post, status }: any) => {
	return (
		<Link
			scroll={false}
			prefetch={false}
			href={{ pathname: '/', query: { id: 0 } }}
			className='w-full h-auto bg-white rounded-md border border-gray-200 p-4 text-start hover:ring-blue-300 hover:ring transition-shadow duration-150'>
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-4'>
					<div className='w-[50px] h-[50px] bg-blue-300 rounded-md'></div>
					<div className='flex flex-col flex-grow'>
						<h5 className='font-bold'>{post.positionTitle}</h5>
						<p className='font-medium text-gray-500'>{post.employer.companyName}</p>
					</div>
					<div className=''>
						{status && status === 'APPLIED' ? (
							<div className='bg-green-100 text-green-500 text-sm font-medium px-2 py-1 rounded-md'>Applied</div>
						) : (
							<button className='bg-sky-100 text-sky-500 text-sm font-medium px-2 py-1 rounded-md'>Apply</button>
						)}
					</div>
				</div>
				<div className='flex gap-2 w-full'>
					<PostTag text={`$${post.pay}/hr`} icon={<MdAttachMoney />} />
				</div>
				<p className='w-full text-gray-600 line-clamp-2'>{post.jobDescription}</p>
			</div>
		</Link>
	);
};

export const PostSkeleton = () => (
	<div className='bg-white rounded-md border border-gray-200 p-4 grid grid-cols-12 gap-3 animate-pulse'>
		<div className='h-[50px] w-[50px] bg-gray-300 rounded col-span-2 row-span-2'></div>
		<div className='h-5 bg-gray-300 rounded col-span-7'></div>
		<div className='h-4 bg-gray-300 rounded col-span-6'></div>
		<div className='h-7 bg-gray-300 rounded col-span-2 col-start-1'></div>
		<div className='h-7 bg-gray-300 rounded col-span-2'></div>
		<div className='h-7 bg-gray-300 rounded col-span-2'></div>
		<div className='h-2 bg-gray-300 rounded col-span-12'></div>
		<div className='h-2 bg-gray-300 rounded col-span-12'></div>
		<div className='h-2 bg-gray-300 rounded col-span-12'></div>
	</div>
);
