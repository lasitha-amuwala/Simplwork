import { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { AuthContextType, GoogleProfileData, GoogleToken } from '@/src/types/Auth';
import { SimplworkApi } from '@/src/utils/simplwork';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const decodeCredential = (credential: string): GoogleToken => jwt_decode(credential);

export const getGoogleProfile = (credential: string): GoogleProfileData => {
	const { exp, email, picture } = decodeCredential(credential);
	return { credential: credential, email, picture, exp };
};

export const isTokenExpired = (credential: string): boolean => {
	const { exp } = decodeCredential(credential);
	return Date.now() >= exp * 1000;
};

// const getCandidate = async (): Promise<any> => await SimplworkApi.get('candidate');

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const [user, setUser] = useState<GoogleProfileData | null>(null);

	const removeUser = () => {
		setUser(null);
		localStorage.removeItem('token');
		SimplworkApi.defaults.headers.common.Authorization = '';
	};

	const handleSignIn = (credential: string): void => {
		if (isTokenExpired(credential)) return;
		setUser(getGoogleProfile(credential));
		localStorage.setItem('token', credential);
	};

	const onSignIn = ({ credential }: CredentialResponse) => {
		if (!credential) return;

		SimplworkApi.defaults.headers.common.Authorization = `Bearer ${credential}`;
		SimplworkApi.get('candidate')
			.then((res) => {
				if (res.status >= 200 && res.status <= 299) {
					setUser(getGoogleProfile(credential));
					localStorage.setItem('token', credential);
				}
			})
			.catch((error) => {
				removeUser();
				alert('User does not exist, Sign up');
			});
	};

	const signOut = () => {
		removeUser();
		googleLogout();
	};

	// on refresh or new window open, log the user in automatically
	useEffect(() => {
		const credential = localStorage.getItem('token');
		console.log('localStorage', credential);
		if (credential && !isTokenExpired(credential)) {
			SimplworkApi.defaults.headers.common.Authorization = `Bearer ${credential}`;
			setUser(getGoogleProfile(credential));
		}
	}, []);

	// set an interceptor to catch 401 errors and remove user
	useEffect(() => {
		SimplworkApi.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response.status === 401) removeUser();
			}
		);
	}, [setUser, removeUser]);

	return (
		<AuthContext.Provider value={{ user, setUser, onSignIn, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
