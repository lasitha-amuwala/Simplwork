import { useAuth } from '@/src/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { MdAttachMoney, MdMap } from 'react-icons/md';
import { simplwork } from '@/src/utils/simplwork';
import Link from 'next/link';

const Home = () => {
	const { user, handleSignIn } = useAuth();

	const { data, isLoading, error } = useQuery(simplwork.candidate.getCandidatePostings(user?.credential as string));

	const [selectedPost, setSelectedPost] = useState(null);

	if (!user?.credential) return <div>Sign in</div>;
	return (
		<div className='flex w-full flex-col pt-20 gap-3'>
			<div>
				<h1 className='text-5xl font-semibold pb-2'>Find your dream job</h1>
				<p className='text-slate-500 pb-2'>Looking for jobs? Browse our latest job openings to view and apply to the best jobs today</p>
			</div>
			<div className='flex w-full h-full'>
				<div className='flex w-full'>
					<button className='flex bg-white rounded-md border px-3 py-2 gap-2 items-center'>
						<MdMap className='w-5 h-5' />
						Map
					</button>
					<div className='w-full flex justify-center'>
						<input className='inputStyle w-[600px] shadow-[0_0_0_1px] shadow-gray-200'></input>
					</div>
				</div>
				<div></div>
			</div>
			<div className='flex gap-3'>
				<div className='w-[15%] h-80 bg-white rounded-md border border-gray-200 mt-1 sticky top-20'></div>

				<div className='w-[35%] flex flex-col gap-3 px-1 pt-1'>
					{isLoading && [...Array(10).fill(0)].map((key, i) => <PostSkeleton key={i} />)}
					{!isLoading && data && data.data.map(({ posting, i }: any) => <Post key={`${posting.id}${i}`} post={posting} />)}
				</div>
				<div className='w-[50%] h-80 bg-white rounded-md border border-gray-200 mt-1 sticky top-20'>
					<h1>{data && data.data[0].posting.positionTitle}</h1>
				</div>
			</div>
		</div>
	);
};

export default Home;

const PostTag = ({ text, icon }: { text: string; icon: ReactNode }) => (
	<div className='bg-gray-100 text-gray-500 flex items-center px-2 py-1 rounded-md text-sm gap-1.5'>
		<span className='rounded-full bg-gray-300 p-0.5'>{icon}</span>
		{text}
	</div>
);

const Post = ({ post }: any) => {
	return (
		<Link
			scroll={false}
			prefetch={false}
			href={{ pathname: '/', query: { id: post.id } }}
			className='w-full h-auto bg-white rounded-md border border-gray-200 p-4 text-start hover:ring-blue-300 hover:ring'>
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-4'>
					<div className='w-[50px] h-[50px] bg-blue-300 rounded-md'></div>
					<div className='flex flex-col flex-grow'>
						<h5 className='font-bold'>{post.positionTitle}</h5>
						<p className='font-medium text-gray-500'>{post.employer.companyName}</p>
					</div>
					<div className=''>
						<button className=''>Apply</button>
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

const PostSkeleton = () => (
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
