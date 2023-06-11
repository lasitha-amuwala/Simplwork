import { CredentialResponse } from "@react-oauth/google";

export type GoogleProfileData = {
	credential: string | undefined;
	name: string;
	givenName: string;
	familyName: string;
	email: string;
	picture: string;
};

export type GoogleToken = {
	iss: string;
	nbf: number;
	aud: string;
	sub: string;
	email: string;
	email_verfified: boolean;
	azp: string;
	name: string;
	picture: string;
	family_name: string;
	given_name: string;
	iat: number;
	exp: number;
	jti: string;
};

export type AuthContextType = {
	user: GoogleProfileData;
	handleSignIn: (credential: CredentialResponse) => void;
	signOut: () => void;
};