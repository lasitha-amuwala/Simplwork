import { useState, useEffect } from 'react';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdMap } from 'react-icons/md';
import { queries } from '@/src/utils/simplwork';
import { useRouter } from 'next/router';
import { SignInCard } from './signin';
import { PostsList } from '@/src/components/Posts/PostsList';
import { JobPost } from '@/src/components/Posts/JobPost';
import { SearchBar } from '@/src/components/SearchBar';
import { Filter } from '@/src/components/Filter';

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [selectedPost, setSelectedPost] = useState<number>(0);
	const [searchInput, setSearchInput] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const {
		data: posts,
		isLoading,
		isError,
	} = useQuery(queries.candidate.searchCandidatePostings(user?.credential ?? '', { queryString: searchQuery, pageSize: '20', pageNo: '0' }));

	useEffect(() => {
		if (router.query.search) {
			setSearchQuery(router.query.search as string);
			setSearchInput(router.query.search as string);
		}
	}, [router]);

	useEffect(() => setSelectedPost(parseInt((router.query.id as string) ?? 0)), [router]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

	const handleSearchSubmit = () => {
		const input = searchInput.replace(/[^A-Za-z0-9]/g, '');
		if (!input) return;
		router.query.search = input;
		router.push(router);
	};

	if (!user) return <SignInCard />;
	return (
		<div className='flex w-full flex-col pt-20 gap-3 pb-20'>
			<div>
				<h1 className='text-5xl font-semibold pb-2'>Find your dream job</h1>
				<p className='text-slate-500 pb-2'>Looking for jobs? Browse our latest job openings to view and apply to the best jobs today</p>
			</div>
			<div className='flex w-full'>
				<button className='flex bg-white rounded-md border px-3 py-2 gap-2 items-center'>
					<MdMap className='w-5 h-5' />
					Map
				</button>
				<SearchBar value={searchInput} onChange={handleSearch} onClick={handleSearchSubmit} />
			</div>
			{isError ? (
				<div className='w-full text-center font-semibold text-5xl flex justify-center items-center pt-20'>Opps... Something went wrong</div>
			) : (
				<div className='flex gap-3'>
					<div className='w-[15%]'>
						<Filter />
					</div>
					<div className='w-[35%] pt-1'>
						<PostsList posts={posts} selectedPost={selectedPost} isLoading={isLoading} />
					</div>
					<div className='w-[50%]'>
						<JobPost posts={posts} selectedPost={selectedPost} isLoading={isLoading} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
