import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { queries } from '@utils/simplwork';
import { SearchBar } from '@components/SearchBar';
import { useAuth } from '@components/Auth/AuthProvider';
import { PostPreviewList } from '@components/Posts/PostPreview';
import { Post } from '@components/Posts/Post';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { useQuery } from '@tanstack/react-query';
//import { ErrorTryAgain } from '@components/ErrorTryAgain';
import Head from 'next/head';

const Home: NextPage = () => {
	const router = useRouter();
	const { user } = useAuth();

	const [selectedPost, setSelectedPost] = useState<number>(0);
	const [searchInput, setSearchInput] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const { data, isLoading, isError, isSuccess } = useQuery({
		...queries.candidate.searchCandidatePostings(user?.credential ?? '', {
			queryString: searchQuery,
			pageSize: '20',
			pageNo: '0',
		}),
		refetchInterval: 30000,
	});

	// sort matches
	const matches: SW.PostingResponse[] = [];
	const posts: SW.PostingResponse[] = [];

	data?.forEach((post) => (post.candidateStatus ? matches.push(post) : posts.push(post)));
	const sortedMatches = matches?.sort((a, b) => b.potentialEarning! - a.potentialEarning!);
	const sortedPosts = [...sortedMatches, ...posts];

	useEffect(() => {
		if (router.query.search) {
			setSearchQuery(router.query.search as string);
			setSearchInput(router.query.search as string);
		}
	}, [router]);

	// if url has id, set id as selected post
	useEffect(() => setSelectedPost(parseInt((router.query.id as string) ?? 0)), [router]);

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
				//<ErrorTryAgain />
			<></>
			) : (
				<div className='flex w-full flex-col pt-5 md:pt-10 gap-5 pb-20'>
					<div className='flex w-full gap-4'>
						<SearchBar value={searchInput} onChange={handleSearch} onClick={handleSearchSubmit} />
					</div>
					<div className='flex gap-4'>
						<div className='w-full md:w-[40%]'>
							<PostPreviewList posts={sortedPosts} selectedPost={selectedPost} isLoading={isLoading} isSuccess={isSuccess} />
						</div>
						<div className='hidden md:block md:w-[60%] lg:w-[60%]'>
							<Post post={sortedPosts[selectedPost]} isLoading={isLoading} isSuccess={isSuccess} />
						</div>
					</div>
				</div>
			)}
		</ProtectedPage>
	);
};

export default Home;
