import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { AuthContextType, GoogleProfileData, GoogleToken } from '@/src/types/Auth';
import jwt_decode from 'jwt-decode';
import { SimplworkClient } from '@/src/utils/simplwork';
import { User } from '@/src/types/api/candidate';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const decodeCredential = (credential: string) => {
	const { email, picture } = jwt_decode(credential as string) as GoogleToken;
	const googleProfile: GoogleProfileData = { credential: credential, email, picture };
	console.log(credential);
	return googleProfile;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setUser] = useState<GoogleProfileData | null>(null);

	const handleSignIn = async (response: CredentialResponse) => {
		const credential = response.credential as string;
		const googleProfile = decodeCredential(credential);

		await SimplworkClient(credential)
			.get('candidate')
			.then((res) => {
				if (res.status >= 200 && res.status <= 299) {
					const user = { ...googleProfile };
					setUser(user);
				}
			})
			.catch((error) => {
				alert('User does not exist, Sign up');
			});
	};

	const signOut = () => {
		setUser(null);
		googleLogout();
	};

	return (
		<AuthContext.Provider value={{ user, setUser, handleSignIn, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
