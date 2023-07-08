import { CredentialResponse } from '@react-oauth/google';

export type GoogleProfileData = {
	credential: string;
	exp: number;
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
	user: GoogleProfileData | null;
	setUser: (user: GoogleProfileData | null) => void;
	onSignIn: (credential: CredentialResponse) => void;
	signOut: () => void;
};
