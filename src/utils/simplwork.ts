import axios from 'axios';
import { CandiateGetRequest } from '../types/api/candidate';

export const SimplworkClient = (token: string) => {
	return axios.create({
		baseURL: 'https://simplwork.com/api/',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};

const { get } = {
	get: (credential: string, url: string) =>
		SimplworkClient(credential)
			.get(url)
			.then((res) => res.data),
};

export const simplwork = {
	candidate: {
		searchCandidatePostings: (credential: string) => ({
			queryKey: ['search-candidate-postings'],
			queryFn: () => get(credential, 'candidate/postings/search'),
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
