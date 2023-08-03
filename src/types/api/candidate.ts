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
	SUNDAY: Array<ShiftTimes>;
	MONDAY: Array<ShiftTimes>;
	TUESDAY: Array<ShiftTimes>;
	WEDNESDAY: Array<ShiftTimes>;
	THURSDAY: Array<ShiftTimes>;
	FRIDAY: Array<ShiftTimes>;
	SATURDAY: Array<ShiftTimes>;
};

export type CandaidateProfile = {
	workHistory?: CandidateWorkHistory[] | [];
	minimumPay: number;
	maximumHours?: number;
	location: CandidateLocation;
	availability?: CandaidateAvailibility;
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

export type Candiate = {
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
	candidate: Candiate;
};

export interface ShiftTimes {
	startTime: number;
	endTime: number;
}
export interface Shift {
	dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	shiftTimes: ShiftTimes;
	id: string;
}

export type Posting = {
	pay: number;
	positionTitle: string;
	jobDescription: string;
	benefits: string;
	createdAt: string;
	employer: any;
	shifts: Shift[];
	isFixedSchedule: boolean;
	estimatedHours?: number;
	id: number;
};

export interface CandidateMatchResponse {
	posting: Posting;
	candidateStatus: string;
}
