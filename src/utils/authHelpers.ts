import { FormikValues } from 'formik';

export const createCandidateRequestBody = (
	values: FormikValues,
	location: SW.ILocation,
	availability: SW.IAvailability,
	email: string
): SW.Candidate.IPostRequest => {
	const candidateProfile: SW.Candidate.IProfile = {
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
