namespace SW {
	type DayOfWeekString = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

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

	interface IShiftTime {
		startTime: number;
		endTime: number;
	}

	interface IShift {
		dayOfWeek: number;
		shiftTimes: IShiftTime;
		id?: string;
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

	interface PostingResponse {
		posting: IPosting;
		employerStatus?: Employer.Status;
		candidateStatus?: Candidate.Status;
		walkCommuteTime?: number;
		bikeCommuteTime?: number;
		carCommuteTime?: number;
		distance?: number;
		matchingHours?: number;
		shiftScore?: number;
		potentialEarning?: number;
		candScore?: number;
		shiftCompatibilities?: IShiftCompatibilities[];
	}

	interface PostingResponse {
		posting: IPosting;
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

	interface ILocation {
		latitude: number;
		longitude: number;
		fullAddress?: string;
		postalCode: string;
		addressComponents?: {
			country: string;
			postode: string;
			neighborhood: string;
			place: string;
			region: string;
		};
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
			gender: 'MALE' | 'FEMALE';
			age: number;
			maxTravelTimes: IMaxTravelTimes;
			workHistory: IWorkHistory[];
			postalCode: string;
			availability: IAvailability;
			autoMatch: boolean;
			picture: string;
			maximumHours: number;
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
		type Status = 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'INTERVIEW_REQUESTED' | 'READY_FOR_INTERVIEW' | 'REJECTED';

		interface IEmployer {
			companyName: string;
			companyDescription: stdistancering;
		}

		interface IBranch {
			company: string;
			branchName: string;
			location: ILocation;
			jobs: IPosting[];
			noOfJobs: number;
		}
		namespace Postings {
			interface IJobPosting extends Omit<IPosting, 'employer'> {
				branch: { branchName: string; location: SW.ILocation };
			}

			interface IOverview {
				jobPosting: JobPosting;
				new_count: number;
				reviewed_count: number;
				interview_requested_count: number;
				ready_for_interview_count: number;
				rejected_count: number;
			}
			interface Match {
				posting: { branch: SW.Employer.IBranch; id: number };
				candidateProfile: Pick<
					ICandidate,
					'candidateName' | 'phoneNumber' | 'email' | 'gender' | 'age' | 'workHistory' | 'availability' | 'id'
				>;
				employerStatus: Employer.Status;
				shiftCompatibilities: IShiftCompatibilities[];
				distance: number;
				matchingHours: number;
				shiftScore: number;
				empScore: number;
			}
		}
	}

	interface IAvailability {
		SUNDAY: IShiftTime[];
		MONDAY: IShiftTime[];
		TUESDAY: IShiftTime[];
		WEDNESDAY: IShiftTime[];
		THURSDAY: IShiftTime[];
		FRIDAY: IShiftTime[];
		SATURDAY: IShiftTime[];
	}
}
