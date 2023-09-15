import { FormikValues } from 'formik';

export const createCandidateRequestBody = (
	values: FormikValues,
	location: SW.ILocation,
	availability: SW.IAvailability,
	email: string
): SW.Candidate.IPostRequest => {
	let maxTravelTimes = { WALK: 20, BIKE: 30, CAR: 90, PUBLIC_TRANSIT: 90 };
	if (values.commuteTypes.length !== 0) {
		const selectedTravelTimes = new Map();
		values.commuteTypes.map((type: string) => selectedTravelTimes.set(type, values.maxTravelTimes[type]));
		maxTravelTimes = Object.fromEntries(selectedTravelTimes);
	}

	const candidateProfile: SW.Candidate.IProfile = {
		workHistory: [],
		minimumPay: 0,
		maximumHours: values.maximumHours,
		location,
		availability,
		maxLiftWeight: 0,
		maxTravelTimes,
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
