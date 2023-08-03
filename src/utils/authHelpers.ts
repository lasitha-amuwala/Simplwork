import { FormikValues } from 'formik';
import { CandaidateProfile, CandiatePostRequest, CandidateLocation } from '../types/api/candidate';

export const createCandidateRequestBody = (values: FormikValues, location: CandidateLocation, email: string): CandiatePostRequest => {
	const candidateProfile: CandaidateProfile = {
		workHistory: [],
		minimumPay: 0,
		maximumHours: values.maximumHours,
		location,
		availability: {
			SUNDAY: [{ startTime: 0, endTime: 1439 }],
			MONDAY: [{ startTime: 0, endTime: 1439 }],
			TUESDAY: [{ startTime: 0, endTime: 1439 }],
			WEDNESDAY: [{ startTime: 0, endTime: 1439 }],
			THURSDAY: [{ startTime: 0, endTime: 1439 }],
			FRIDAY: [{ startTime: 0, endTime: 1439 }],
			SATURDAY: [{ startTime: 0, endTime: 1439 }],
		},
		maxLiftWeight: 0,
		maxTravelTimes: values.maxTravelTimes,
		autoMatch: true,
	};

	const user = {
		email: email,
		age: values.age,
		gender: values.gender.toUpperCase(),
		phoneNumber: values.phoneNumber,
		name: values.fullName,
	};

	return {
		candidateProfile: candidateProfile,
		user: user,
	};
};
