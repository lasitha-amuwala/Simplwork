import { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { CredentialResponse, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { SimplworkApi } from '@utils/simplwork';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { AuthContextType, GoogleProfileData, GoogleToken } from './Auth';

export const AuthContext = createContext<AuthContextType | null>(null);
// hook to use context without having to import AuthContext each time
export const useAuth = () => useContext(AuthContext) as AuthContextType;
// decode jwt
const decodeCredential = (credential: string): GoogleToken => jwt_decode(credential);
// set axios authorization header to credential
const setAuthorization = (credential: string) => (SimplworkApi.defaults.headers.common.Authorization = `Bearer ${credential}`);
// set localstorage token
const setLocalStorage = (token: string | null) => (!token ? localStorage.removeItem('token') : localStorage.setItem('token', token));

// extract google profile data from jwt
export const getGoogleProfile = (credential: string): GoogleProfileData => {
	const { exp, email, picture, name } = decodeCredential(credential);
	return { credential: credential, email, picture, name, exp, };
};

// checks expiry on token
export const isTokenExpired = (credential: string): boolean => {
	const { exp } = decodeCredential(credential);
	return Date.now() >= exp * 1000;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
	const router = useRouter();
	const [user, setUser] = useState<GoogleProfileData | null>(null);
	const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

	const onSignIn = ({ credential }: CredentialResponse) => {
		if (!credential) return;

		setUser(getGoogleProfile(credential));
		setAuthorization(credential);
		SimplworkApi.get('candidate')
			.then((res) => {
				if (res.status >= 200 && res.status <= 299) {
					setLoggedIn(true);
					setLocalStorage(credential);
					router.replace('/');
					return;
				}
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setLoggedIn(false);
					router.push('/register');
					return;
				}
				setAuthorization('');
				setUser(null);
			});
	};

	const onEmplyerSignIn = ({ credential }: CredentialResponse) => {
		if (!credential) return;

		setUser(getGoogleProfile(credential));
		setAuthorization(credential);
		SimplworkApi.get('user/employerList')
			.then((res) => {
				if (res.status >= 200 && res.status <= 299) {
					if (res.data.length > 0) {
						setLoggedIn(true);
						setLocalStorage(credential);
						router.replace('/e/');
						return;
					} else {
						setLoggedIn(false);
						router.push('/e/register');
					}
				}
			})
			.catch((err) => {
				alert('There was an internal server error, please try again.');
			});
	};

	const signOut = () => signOutUser();

	const signOutUser = () => {
		setLocalStorage(null);
		setAuthorization('');
		googleLogout();
		setUser(null);
		setLoggedIn(false);
		router.replace('/signin');
	};

	const signInUser = (credential: string) => {
		if (!credential) return;
		if (isTokenExpired(credential)) {
			alert('Session Expired, Please try again.');
			return;
		}
		setAuthorization(credential);
		setLocalStorage(credential);
		setUser(getGoogleProfile(credential));
		router.replace('/');
	};

	// const onSignUp = ({ credential }: CredentialResponse): Promise<boolean> => {
	// 	if (!credential) return Promise.resolve(false);
	// 	if (isTokenExpired(credential)) return Promise.resolve(false);

	// 	setAuthorization(credential);
	// 	return getCandidate()
	// 		.then((res: any) => {
	// 			if (res.status >= 200 && res.status <= 299) {
	// 				signInUser(credential);
	// 				router.push('/');
	// 			}
	// 			return false;
	// 		})
	// 		.catch((error: any) => {
	// 			if (error.response.status == 404) return true;
	// 			return false;
	// 		});
	// };

	// on refresh or new window open, log the user in automatically
	// useEffect(() => {
	// 	const credential = localStorage.getItem('token');
	// 	if (credential && !isTokenExpired(credential)) signInUser(credential);
	// }, []);

	// set an interceptor to catch 401 errors and remove user
	useEffect(() => {
		SimplworkApi.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response?.status === 401) signOutUser();
				return Promise.reject(error);
			}
		);
	}, [signOutUser]);

	return (
		<AuthContext.Provider value={{ user, isLoggedIn: isLoggedIn, signInUser, onEmplyerSignIn, onSignIn, signOut }}>
			<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	);
};
