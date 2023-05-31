interface CandidateWorkHistory {
	positionTitle: string;
	companyName: string;
	details: string;
	startDate: Date;
	endDate: Date;
}

interface CandidateLocation {
	latitude: number;
	longitude: number;
	postalCode: string;
}

interface CandaidateAvailibility {
	times: [];
}

export interface CandaidateProfile {
	workHistory: CandidateWorkHistory[] | [];
	minimumPay: number;
	minimumHours: number;
	location: CandidateLocation;
	availibility?: CandaidateAvailibility;
	maxLiftWeight: number;
	maxTravelTimes?: CandidateMaxTravelTimes[];
	autoMatch: boolean;
}

interface CandidateMaxTravelTimes {}

interface User {
	email: string;
	age: number;
	gender: string;
	phoneNumber: string;
	name: string;
}

export interface CandiatePostRequest {
	candidateProfile: CandaidateProfile;
	user: User;
}

export interface CandiateGetRequest {
	profileName: string;
	candidateName: string;
	phoneNumber: string;
	email: string;
	gender: string;
	age: number;
	maxTravelTimes: CandidateMaxTravelTimes[];
	workHistory: CandidateWorkHistory[];
	postalCode: string;
	availibility: CandaidateAvailibility;
	autoMatch: boolean;
}
