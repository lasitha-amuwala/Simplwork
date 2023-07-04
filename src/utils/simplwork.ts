import axios from 'axios';

export const SimplworkClient = (token: string) => {
	return axios.create({
		baseURL: 'https://simplwork.com/api/',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};

const createURL = (endpoint: string, params?: any) => {
	const query = new URLSearchParams({ ...params });
	query.forEach((val, key) => {
		if (val == '' || val == 'undefined') query.delete(key);
	});
	return `${endpoint}?${query}`;
};

const { get } = {
	get: (credential: string, url: string) =>
		SimplworkClient(credential)
			.get(url)
			.then((res) => res.data),
};

export const simplwork = {
	candidate: {
		searchCandidatePostings: (credential: string, params: { [x: string]: string }) => ({
			queryKey: ['search-candidate-postings', params],
			queryFn: () => get(credential, createURL('candidate/postings/search', params)),
			enabled: !!credential,
		}),
		getCandidate: (credential: string) => ({
			queryKey: ['candidate'],
			queryFn: (): Promise<any> => get(credential, 'candidate'),
			enabled: !!credential,
		}),
		getCandidatePostings: (credential: string) => ({
			queryKey: ['personal-candidate-postings'],
			queryFn: (): Promise<any> => get(credential, 'candidate/postings/personal'),
			enabled: !!credential,
		}),
	},
};
