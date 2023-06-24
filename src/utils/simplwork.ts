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
		getCandidatePostings: (credential: string) => ({
			queryKey: ['candidate-postings'],
			queryFn: () => get(credential, 'candidate/postings/search'),
		}),
		getCandidate: (credential: string) => ({
			queryKey: ['candidate'],
			queryFn: (): Promise<any> => get(credential, 'candidate'),
		}),
	},
};
