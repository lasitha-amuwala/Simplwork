import { FormikValues } from 'formik';
import { CandaidateProfile, CandidatePostRequest, CandidateLocation, CandaidateAvailibility } from '../types/api/candidate';

export const createCandidateRequestBody = (
	values: FormikValues,
	location: CandidateLocation,
	availability: CandaidateAvailibility,
	email: string
): CandidatePostRequest => {
	const candidateProfile: CandaidateProfile = {
		workHistory: [],
		minimumPay: 0,
		maximumHours: values.maximumHours,
		location,
		availability,
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
