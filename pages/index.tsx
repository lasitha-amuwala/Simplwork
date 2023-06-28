import react, { useState, useEffect } from 'react';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdMap } from 'react-icons/md';
import { simplwork } from '@/src/utils/simplwork';
import { SignInCard } from './signin';
import { Post, PostSkeleton } from '@/src/components/Post';
import { useRouter } from 'next/router';
import { JobPost, JobPostSkeleton } from '@/src/components/JobPost';
import Link from 'next/link';

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [selectedPost, setSelectedPost] = useState<number>(0);

	const { data, isLoading, isError } = useQuery(simplwork.candidate.searchCandidatePostings(user?.credential ?? ''));

	useEffect(() => {
		if (data) setSelectedPost(parseInt((router.query.id as string) ?? 0));
	}, [data, router]);

	if (!user) return <SignInCard />;

	if (isError)
		<div className='w-full text-center font-semibold text-5xl flex justify-center items-center h-[calc(100vh-var(--header-height))]'>
			Opps...Something went wrong
		</div>;

	return (
		<div className='flex w-full flex-col pt-20 gap-3 pb-20'>
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
				<div className='w-[15%] h-80 bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px]'></div>
				<div className='w-[35%] flex flex-col gap-3 px-1 pt-1'>
					{isLoading
						? [...Array(20).fill(0)].map((key, i) => <PostSkeleton key={i} />)
						: data.map(({ posting, candidateStatus }: any, i: number) => (
								<Link key={`${posting.id}${i}`} scroll={false} prefetch={false} href={{ pathname: '/', query: { id: i } }} className='w-full'>
									<Post post={posting} status={candidateStatus} active={selectedPost === i} />
								</Link>
						  ))}
				</div>
				<div className='w-[50%]'>
					{isLoading ? <JobPostSkeleton /> : isError ? <div>ERROR</div> : <JobPost postData={data[selectedPost]} />}
				</div>
			</div>
		</div>
	);
};

export default Home;
