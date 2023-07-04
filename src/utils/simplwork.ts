import axios from 'axios';

export const SimplworkApi = axios.create({
	baseURL: 'https://simplwork.com/api/',
	headers: { 'Content-Type': 'application/json' },
});

const { get } = {
	get: (url: string) => SimplworkApi.get(url).then((res) => res.data),
};

export const simplwork = {
	candidate: {
		getCandidate: (credential: string) => ({
			queryKey: ['candidate'],
			queryFn: (): Promise<any> => get('candidate'),
			enabled: !!credential,
		}),
		getCandidatePostings: (credential: string) => ({
			queryKey: ['candidate/postings/personal'],
			queryFn: (): Promise<any> => get('candidate/postings/personal'),
			enabled: !!credential,
		}),
		searchCandidatePostings: (credential: string) => ({
			queryKey: ['candidate/postings/search'],
			queryFn: () => get('candidate/postings/search'),
			enabled: !!credential,
		}),
	},
};
