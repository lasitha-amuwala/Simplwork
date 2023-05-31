import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { AuthContextType, GoogleProfileData, GoogleToken } from '@/src/types/Auth';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setGoogleProfile] = useState<GoogleProfileData | null>(null);

	const handleSignIn = ({ credential }: CredentialResponse) => {
		const { name, email, family_name, given_name, picture } = jwt_decode(credential as string) as GoogleToken;
		const googleProfile = { credential: credential, name, email, familyName: family_name, givenName: given_name, picture };
		console.log(googleProfile.credential);
		setGoogleProfile(googleProfile);
	};

	const signOut = () => {
		setGoogleProfile(null);
		googleLogout();
	};

	return (
		<AuthContext.Provider value={{ user, handleSignIn, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
