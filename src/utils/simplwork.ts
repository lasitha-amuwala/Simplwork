import axios from 'axios';
import { createURL } from './httpUtils';
import { get, post } from './http';

export const SimplworkApi = axios.create({
	baseURL: 'https://simplwork.com/api/',
	headers: { 'Content-Type': 'application/json' },
});

type Params = { [x: string]: string };
export const queries = {
	candidate: {
		getCandidate: (credential: string) => ({
			queryKey: ['candidate'],
			queryFn: (): Promise<SW.Candidate.ICandidate> => get('candidate'),
			enabled: !!credential,
		}),
		getCandidatePostings: (credential: string, params: Params) => ({
			queryKey: ['candidate/postings/personal', params],
			queryFn: (): Promise<any> => get(createURL('candidate/postings/personal', params)),
			enabled: !!credential,
		}),
		searchCandidatePostings: (credential: string, params: Params) => ({
			queryKey: ['candidate/postings/search', params],
			queryFn: (): Promise<SW.PostingResponse[]> => get(createURL('candidate/postings/search', params)),
			enabled: !!credential,
		}),
	},
	employer: {
		getEmployer: (credential: string, employerName: string) => ({
			queryKey: [`employer/${employerName}`],
			queryFn: (): Promise<SW.Employer.IEmployer> => get(createURL(`employer/${employerName}`)),
			enabled: !!credential,
		}),
		getBranches: (credential: string, employerName: string | null, params: Params) => ({
			queryKey: [`employer/${employerName}/branch`, params],
			queryFn: (): Promise<SW.Employer.IBranch[]> => get(createURL(`employer/${employerName}/branch`, params)),
			enabled: !!credential && !!employerName,
		}),
		postings: {
			getOverviews: (credential: string, employerName: string, params: Params) => ({
				queryKey: ['employer/postings/overviews', employerName, params],
				queryFn: (): Promise<SW.Employer.Postings.IOverview[]> =>
					get(createURL(`employer/postings/overview`, { employerName: employerName, ...params })),
				enabled: !!credential && !!employerName,
			}),
			getMatchesbyId: (credential: string, id: number, status: SW.Employer.Status, params: Params) => ({
				queryKey: ['employer/postings/match', id, status, params],
				queryFn: (): Promise<SW.Employer.Postings.Match[]> => get(createURL(`employer/postings/match/${id}`, { status, ...params })),
			}),
		},
	},
	user: {
		employerList: (credential: string) => ({
			queryKey: ['employeeList'],
			queryFn: (): Promise<any> => get(`user/employerList`),
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
