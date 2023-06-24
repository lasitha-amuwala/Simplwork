import react, { useState, useEffect } from 'react';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdMap } from 'react-icons/md';
import { simplwork } from '@/src/utils/simplwork';
import { SignInCard } from './signin';
import { Post, PostSkeleton } from '@/src/components/Post';

const Home = () => {
	const { user } = useAuth();
	const { data, isLoading } = useQuery({ ...simplwork.candidate.getCandidatePostings(user?.credential as string), enabled: !!user });

	const [selectedPost, setSelectedPost] = useState(null);

	useEffect(() => {
		if (data) setSelectedPost(data[0]);
	}, [data, user]);

	if (!user) return <SignInCard />;
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
				<div className='w-[15%] h-80 bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px]'></div>
				<div className='w-[35%] flex flex-col gap-3 px-1 pt-1'>
					{isLoading && [...Array(20).fill(0)].map((key, i) => <PostSkeleton key={i} />)}
					{!isLoading &&
						data &&
						data.map(({ posting, candidateStatus, i }: any) => <Post key={`${posting.id}${i}`} post={posting} status={candidateStatus} />)}
				</div>
				<div className='w-[50%] min-h-[800px] h-full bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px] overflow-hidden'>
					<div className='h-28 bg-[#64B1EC]/10 flex items-center p-4 gap-4'>
						<div className='h-20 w-20 bg-blue-300 rounded-md'></div>
						<div className='h-full'>
							{/* {selectedPost && <h1 className='font-bold text-xl'>{selectedPost?.posting.employer.companyName}</h1>}
							{selectedPost && <h1 className='font-bold text-xl'>{selectedPost?.posting.employer.companyDescription}</h1>} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
