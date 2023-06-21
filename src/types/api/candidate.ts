import { GoogleProfileData } from '../Auth';

export type CandidateWorkHistory = {
	positionTitle: string;
	companyName: string;
	details: string;
	startDate?: string;
	endDate?: string;
};

export type CandidateLocation = {
	latitude: number;
	longitude: number;
	postalCode: string;
};

export type CandaidateAvailibility = {
	times: [];
};

export type CandaidateProfile = {
	workHistory?: CandidateWorkHistory[] | [];
	minimumPay: number;
	maximumHours?: number;
	location: CandidateLocation;
	availability?: any;
	maxLiftWeight?: number;
	maxTravelTimes?: CandidateMaxTravelTimes;
	autoMatch: boolean;
};

export type CandidateMaxTravelTimes = {
	[key: string]: number;
};

export type CandiatePostRequest = {
	candidateProfile: CandaidateProfile;
	user: UserData;
};

export type CandiateGetRequest = {
	profileName: string;
	candidateName: string;
	phoneNumber: string;
	email: string;
	gender: 'MALE' | 'FEMALE' | 'OTHER';
	age: number;
	maxTravelTimes: CandidateMaxTravelTimes;
	workHistory: CandidateWorkHistory[];
	postalCode: string;
	availibility: CandaidateAvailibility;
	autoMatch: boolean;
};

export type UserData = {
	email?: string;
	age?: number;
	gender?: string;
	phoneNumber?: string;
	name?: string;
};

export type User = GoogleProfileData & {
	candidate: CandiateGetRequest;
};
