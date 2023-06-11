export type CandidateWorkHistory = {
  positionTitle: string;
  companyName: string;
  details: string;
  startDate: Date;
  endDate: Date;
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
  workHistory: CandidateWorkHistory[] | [];
  minimumPay: number;
  minimumHours: number;
  location: CandidateLocation;
  availibility?: CandaidateAvailibility;
  maxLiftWeight: number;
  maxTravelTimes?: CandidateMaxTravelTimes;
  autoMatch: boolean;
};

export type CandidateMaxTravelTimes = {
  [key: string]: number;
};

export type User = {
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  name: string;
};

export type CandiatePostRequest = {
  candidateProfile: CandaidateProfile;
  user: User;
};

export type CandiateGetRequest = {
  profileName: string;
  candidateName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  age: number;
  maxTravelTimes: CandidateMaxTravelTimes;
  workHistory: CandidateWorkHistory[];
  postalCode: string;
  availibility: CandaidateAvailibility;
  autoMatch: boolean;
};
