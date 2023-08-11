import { useState, useEffect } from 'react';
import { useAuth } from '@/src/components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { MdMap } from 'react-icons/md';
import { queries } from '@/src/utils/simplwork';
import { useRouter } from 'next/router';
import { SignInCard } from './signin';
import { PostList } from '@/src/components/Posts/PostList';
import { Post } from '@/src/components/Posts/Post';
import { SearchBar } from '@/src/components/SearchBar';
import { Filter } from '@/src/components/Filter';
import { PostSkeleton } from '@/src/components/Posts/Skeletons/PostSkeleton';

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [selectedPost, setSelectedPost] = useState<number>(0);
	const [searchInput, setSearchInput] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const { data, isLoading, isError, isSuccess } = useQuery(
		queries.candidate.searchCandidatePostings(user?.credential ?? '', { queryString: searchQuery, pageSize: '20', pageNo: '0' })
	);

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
		<div className='flex w-full flex-col pt-5 md:pt-14 gap-3 pb-20'>
			<div className='flex w-full gap-4'>
				<button className='flex bg-white rounded-md border px-3 py-2 gap-2 items-center'>
					<MdMap className='w-5 h-5' />
					<span className='hidden md:block'>Map</span>
				</button>
				<SearchBar value={searchInput} onChange={handleSearch} onClick={handleSearchSubmit} />
			</div>
			{isError ? (
				<div className='w-full text-center font-semibold text-5xl flex justify-center items-center pt-20'>Opps... Something went wrong</div>
			) : (
				<div className='flex gap-4'>
					<div className='hidden lg:block w-0 lg:w-[15%]'>
						<Filter />
					</div>
					<div className='w-full md:w-[35%] pt-1'>
						<PostList posts={data} selectedPost={selectedPost} isLoading={isLoading} />
					</div>
					<div className='hidden md:block md:w-[65%] lg:w-[50%]'>
						{isLoading && <PostSkeleton />}
						{!isLoading && isSuccess && data.length > 0 ? (
							<Post posts={data} selectedPost={selectedPost} />
						) : (
							<div className='mt-1 bg-gray-200 w-full py-10 px-5 flex flex-col justify-center items-center rounded'>
								<p className='py-10 font-semibold'>No Posts available, Please try again.</p>
							</div>
						)}
					</div>
				</div>
			)}
			{/* <pre className='text-xs'>{user.credential}</pre> */}
		</div>
	);
};

export default Home;
