namespace SW {
	type DayOfWeekString = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
	type DayOfWeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

	interface IMaxTravelTimes {
		BIKE?: number;
		WALK?: number;
		CAR?: number;
		PUBLIC_TRANSIT?: number;
	}

	interface IWorkHistory {
		positionTitle: string;
		companyName: string;
		details: string;
		startDate?: string;
		endDate?: string;
	}

	interface IShiftTimes {
		startTime: number;
		endTime: number;
	}

	interface IShift {
		dayOfWeek: DayOfWeekNumber;
		shiftTimes: IShiftTimes;
		id: string;
	}

	interface IShiftCompatibilities {
		shift: IShift;
		minAfterShift: number;
		minTillEnd: number;
	}

	interface IPosting {
		pay: number;
		positionTitle: string;
		jobDescription: string;
		benefits: string;
		createdAt: string;
		employer: any;
		shifts: IShift[];
		isFixedSchedule: boolean;
		estimatedHours?: number;
		id: number;
	}

	interface IMatchPosting {
		employerStatus: Employer.Status;
		candidateStatus: Candidate.Status;
		walkCommuteTime: number;
		bikeCommuteTime: number;
		carCommuteTime: number;
		distance: number;
		matchingHours: number;
		shiftScore: number;
		potentialEarning: number;
		candScore: number;
		shiftCompatibilities: IShiftCompatibilities[];
	}

	type PostingResponse = {
		posting: IPosting;
	} & IMatchPosting;

	interface ILocation {
		latitude: number;
		longitude: number;
		postalCode: string;
	}

	interface IUserData {
		email?: string;
		age?: number;
		gender?: string;
		phoneNumber?: string;
		name?: string;
	}

	namespace Candidate {
		type Status = 'APPLIED' | 'ACCEPT_INTERVIEW' | 'WITHDRAWN';

		interface ICandidate {
			profileName: string;
			candidateName: string;
			phoneNumber: string;
			email: string;
			gender: 'MALE' | 'FEMALE' | 'OTHER';
			age: number;
			maxTravelTimes: IMaxTravelTimes;
			workHistory: IWorkHistory[];
			postalCode: string;
			availability: IAvailability;
			autoMatch: boolean;
			picture: string;
		}

		interface IProfile {
			workHistory?: IWorkHistory[] | [];
			minimumPay: number;
			maximumHours?: number;
			location: ILocation;
			availability?: IAvailability;
			maxLiftWeight?: number;
			maxTravelTimes?: IMaxTravelTimes;
			autoMatch: boolean;
		}

		interface IPostRequest {
			candidateProfile: Candidate.IProfile;
			user: IUserData;
		}
	}

	namespace Employer {
		type Status = 'NEW' | 'REVIEWED' | 'INTERVIEW_REQUESTED' | 'READY_FOR_INTERVIEW' | 'REJECTED';

		interface IEmployer {
			companyName: string;
			companyDescription: string;
		}

		interface IBranch {
			company: string;
			branchName: string;
			location: ILocation;
			jobs: IPosting[];
			noOfJobs: number;
		}
	}

	interface IAvailability {
		SUNDAY: IShiftTimes[];
		MONDAY: IShiftTimes[];
		TUESDAY: IShiftTimes[];
		WEDNESDAY: IShiftTimes[];
		THURSDAY: IShiftTimes[];
		FRIDAY: IShiftTimes[];
		SATURDAY: IShiftTimes[];
	}
}
