// import { GoogleProfileData } from "@components/Auth/Auth";

// export type CandidateMaxTravelTimes = {
// 	BIKE?: number;
// 	WALK?: number;
// 	CAR?: number;
// 	PUBLIC_TRANSIT?: number;
// };

// export type Candidate = {
// 	profileName: string;
// 	candidateName: string;
// 	phoneNumber: string;
// 	email: string;
// 	gender: 'MALE' | 'FEMALE' | 'OTHER';
// 	age: number;
// 	maxTravelTimes: CandidateMaxTravelTimes;
// 	workHistory: CandidateWorkHistory[];
// 	postalCode: string;
// 	availability: CandaidateAvailibility;
// 	autoMatch: boolean;
// 	picture: string;
// };

// export type UserData = {
// 	email?: string;
// 	age?: number;
// 	gender?: string;
// 	phoneNumber?: string;
// 	name?: string;
// };

// export type User = GoogleProfileData & {
// 	candidate: Candidate;
// };

// export interface ShiftTimes {
// 	startTime: number;
// 	endTime: number;
// }
// export interface Shift {
// 	dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
// 	shiftTimes: ShiftTimes;
// 	id: string;
// }
// interface shiftCompatibilities {
// 	shift: Shift;
// 	minAfterShift: number;
// 	minTillEnd: number;
// }

// export type DayOfWeekString = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
// type EmployerStatus = 'NEW' | 'REVIEWED' | 'INTERVIEW_REQUESTED' | 'READY_FOR_INTERVIEW' | 'REJECTED';
// type CandidateStatus = 'APPLIED' | 'ACCEPT_INTERVIEW' | 'WITHDRAWN';
// export interface Posting {
// 	pay: number;
// 	positionTitle: string;
// 	jobDescription: string;
// 	benefits: string;
// 	createdAt: string;
// 	employer: any;
// 	shifts: Shift[];
// 	isFixedSchedule: boolean;
// 	estimatedHours?: number;
// 	id: number;
// }
// export interface MatchPosting {
// 	employerStatus: EmployerStatus;
// 	candidateStatus: CandidateStatus;
// 	walkCommuteTime: number;
// 	bikeCommuteTime: number;
// 	carCommuteTime: number;
// 	distance: number;
// 	matchingHours: number;
// 	shiftScore: number;
// 	potentialEarning: number;
// 	candScore: number;
// 	shiftCompatibilities: shiftCompatibilities[];
// }

// export type PostingResponse = {
// 	posting: Posting;
// } & MatchPosting;
