import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { queries } from '@utils/simplwork';
import { MdErrorOutline } from 'react-icons/md';
import { SearchBar } from '@components/SearchBar';
import { useAuth } from '@components/Auth/AuthProvider';
import { PostPreviewList } from '@components/Posts/PostPreview';
import { Post, PostSkeleton } from '@components/Posts/Post';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';

const Home: NextPage = () => {
	const router = useRouter();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [selectedPost, setSelectedPost] = useState<number>(0);
	const [searchInput, setSearchInput] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const postingQuery = queries.candidate.searchCandidatePostings(user?.credential ?? '', {
		queryString: searchQuery,
		pageSize: '20',
		pageNo: '0',
	});

	const { data, isLoading, isError, isSuccess } = useQuery({ ...postingQuery, refetchInterval: 30000 });

	useEffect(() => {
		if (router.query.search) {
			setSearchQuery(router.query.search as string);
			setSearchInput(router.query.search as string);
		}
	}, [router]);

	// if url has id, set id as selected post
	useEffect(() => setSelectedPost(parseInt((router.query.id as string) ?? 0)), [router]);
	// refetch postings
	const refetch = () => queryClient.invalidateQueries(postingQuery);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

	const handleSearchSubmit = () => {
		const input = searchInput.replace(/[^A-Za-z0-9]/g, '');
		if (!input) return;
		router.query.search = input;
		router.push(router);
	};

	return (
		<ProtectedPage>
			<Head>
				<title>Find Jobs - Simplwork</title>
			</Head>
			{isError ? (
				<div className='flex flex-col gap-3 w-full h-[50vh] justify-center items-center text-gray-600'>
					<MdErrorOutline className='text-8xl' />
					<h1 className='text-3xl font-medium'>An Error Occured</h1>
					<button className='button rounded-full' onClick={() => router.reload()}>
						Try again
					</button>
				</div>
			) : (
				<div className='flex w-full flex-col pt-5 md:pt-14 gap-3 pb-20'>
					<div className='flex w-full gap-4'>
						<SearchBar value={searchInput} onChange={handleSearch} onClick={handleSearchSubmit} />
					</div>
					<div className='flex gap-4'>
						<div className='w-full md:w-[40%] pt-1'>
							<PostPreviewList posts={data} selectedPost={selectedPost} isLoading={isLoading} />
						</div>
						<div className='hidden md:block md:w-[60%] lg:w-[60%]'>
							{isLoading && <PostSkeleton />}
							{!isLoading && isSuccess && data.length > 0 ? (
								<Post post={data[selectedPost]} refetch={refetch} />
							) : (
								<div className='mt-1 bg-gray-200 w-full py-10 px-5 flex flex-col justify-center items-center rounded'>
									<p className='py-10 font-semibold'>No Posts available, Please try again.</p>
								</div>
							)}
						</div>
					</div>
					{/* <pre className='text-xs'>{user.credential}</pre> */}
				</div>
			)}
		</ProtectedPage>
	);
};

export default Home;
