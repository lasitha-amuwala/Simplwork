import { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { AuthContextType, GoogleProfileData, GoogleToken } from '@/src/types/Auth';
import { SimplworkApi } from '@/src/utils/simplwork';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext) as AuthContextType;

// decode jwt
const decodeCredential = (credential: string): GoogleToken => jwt_decode(credential);

// set axios authorization header to credential
const setAuthorization = (credential: string) => (SimplworkApi.defaults.headers.common.Authorization = `Bearer ${credential}`);

const getCandidate = async (): Promise<any> => await SimplworkApi.get('candidate');

// extract google profile data from jwt
export const getGoogleProfile = (credential: string): GoogleProfileData => {
	const { exp, email, picture } = decodeCredential(credential);
	return { credential: credential, email, picture, exp };
};

// checks expiry on token
export const isTokenExpired = (credential: string): boolean => {
	const { exp } = decodeCredential(credential);
	return Date.now() >= exp * 1000;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const router = useRouter();
	const [user, setUser] = useState<GoogleProfileData | null>(null);
	const signOut = () => removeUser();

	const removeUser = () => {
		setUser(null);
		setAuthorization('');
		googleLogout();
		localStorage.removeItem('token');
	};

	const onSignIn = ({ credential }: CredentialResponse) => {
		if (!credential) return;

		setAuthorization(credential);
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

	const onSignUp = ({ credential }: CredentialResponse): Promise<boolean> => {
		if (!credential) return Promise.resolve(false);
		if (isTokenExpired(credential)) return Promise.resolve(false);

		setAuthorization(credential);
		return getCandidate()
			.then((res: any) => {
				if (res.status >= 200 && res.status <= 299) {
					setUser(getGoogleProfile(credential));
					localStorage.setItem('token', credential);
					router.push('/');
				}
				return false;
			})
			.catch((error: any) => {
				if (error.response.status == 404) {
					console.log('first');
					return true;
				}
				return false;
			});
	};

	// on refresh or new window open, log the user in automatically
	useEffect(() => {
		const credential = localStorage.getItem('token');
		if (credential && !isTokenExpired(credential)) {
			setAuthorization(credential);
			setUser(getGoogleProfile(credential));
		}
	}, []);

	// set an interceptor to catch 401 errors and remove user
	useEffect(() => {
		SimplworkApi.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response?.status === 401) removeUser();
				return Promise.reject(error);
			}
		);
	}, [setUser, removeUser]);

	return (
		<AuthContext.Provider value={{ user, setUser, onSignIn, onSignUp, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
