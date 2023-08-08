import axios from 'axios';
import { createURL } from './httpUtils';
import { get, post } from './http';
import { PostingResponse } from '../types/api/candidate';

export const SimplworkApi = axios.create({
	baseURL: 'https://simplwork.com/api/',
	headers: { 'Content-Type': 'application/json' },
});

type Params = { [x: string]: string };
export const queries = {
	candidate: {
		getCandidate: (credential: string) => ({
			queryKey: ['candidate'],
			queryFn: (): Promise<any> => get('candidate'),
			enabled: !!credential,
		}),
		getCandidatePostings: (credential: string, params: Params) => ({
			queryKey: ['candidate/postings/personal', params],
			queryFn: (): Promise<any> => get(createURL('candidate/postings/personal', params)),
			enabled: !!credential,
		}),
		searchCandidatePostings: (credential: string, params: Params) => ({
			queryKey: ['candidate/postings/search', params],
			queryFn: (): Promise<PostingResponse[]> => get(createURL('candidate/postings/search', params)),
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
