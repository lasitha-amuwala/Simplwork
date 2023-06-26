import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { AuthContextType, GoogleProfileData, GoogleToken } from '@/src/types/Auth';
import { SimplworkClient } from '@/src/utils/simplwork';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const decodeCredential = (credential: string) => {
	const { email, picture } = jwt_decode(credential as string) as GoogleToken;
	const googleProfile: GoogleProfileData = { credential: credential, email, picture };
	console.log(credential);
	return googleProfile;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const credential = localStorage.getItem('token');
		console.log(credential)
		if (credential) setUser(credential);
	}, []);

	const getCandidate = async (credential: string): Promise<any> => {
		return await SimplworkClient(credential).get('candidate');
	};

	const onSignIn = ({ credential }: CredentialResponse) => {
		if (!credential) return;

		getCandidate(credential)
			.then((res) => {
				if (res.status >= 200 && res.status <= 299) {
					setUser(credential);
					localStorage.setItem('token', credential);
				}
			})
			.catch((error) => alert('User does not exist, Sign up'));
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem('token');
		googleLogout();
	};

	return (
		<AuthContext.Provider value={{ user, setUser, onSignIn, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
