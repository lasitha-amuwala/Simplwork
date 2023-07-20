import axios from 'axios';
import { createURL } from './httpUtils';
import { get, post } from './http';

export const SimplworkApi = axios.create({
	baseURL: 'https://simplwork.com/api/',
	headers: { 'Content-Type': 'application/json' },
});

export const queries = {
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
		searchCandidatePostings: (credential: string, params: { [x: string]: string }) => ({
			queryKey: ['candidate/postings/search', params],
			queryFn: () => get(createURL('candidate/postings/search', credential, params)),
			enabled: !!credential,
		}),
	},
};

export const mutations = {
	candidate: {
		setPostStatus: {
			mutationFn: (id: string, status: string) => post('candidate/postings/setStatus', { id, status }),
		},
	},
};

export const patchCandidate = (data: any) => {
	return SimplworkApi.patch('candidate', JSON.stringify(data), { headers: { 'Content-Type': 'application/json-patch+json' } });
};
