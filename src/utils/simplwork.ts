import axios from 'axios';

export const SimplworkApi = axios.create({
	baseURL: 'https://simplwork.com/api/',
	headers: { 'Content-Type': 'application/json' },
});

const createURL = (endpoint: string, params?: any) => {
	const query = new URLSearchParams({ ...params });
	query.forEach((val, key) => {
		if (val == '' || val == 'undefined') query.delete(key);
	});
	return `${endpoint}?${query}`;
};

const { get } = {
	get: (url: string) => SimplworkApi.get(url).then((res) => res.data),
};

export const simplwork = {
	candidate: {
		searchCandidatePostings: (credential: string, params: { [x: string]: string }) => ({
			queryKey: ['candidate/postings/search', params],
			queryFn: () => get(createURL('candidate/postings/search', params)),
			enabled: !!credential,
		}),
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
	},
};
