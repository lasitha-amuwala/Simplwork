import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { CgSpinner } from 'react-icons/cg';

type Props = {};

export const ProtectedPage = ({ children }: PropsWithChildren<Props>) => {
	const router = useRouter();
	const { user, isLoggedIn } = useAuth();
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		if (!user || !isLoggedIn) {
			const userType = localStorage.getItem('userType');
			router.replace('/signin');
		}
		if (user && isLoggedIn) setLoading(false);
	}, [user, router, isLoggedIn]);

	if (isLoading)
		return (
			<div className='flex items-center justify-center w-full h-screen animate-spin'>
				<CgSpinner className='w-12 h-12 text-[#64B1EC]' />
			</div>
		);
	return <>{children}</>;
};
