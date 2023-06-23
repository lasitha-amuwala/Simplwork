import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { CgSpinner } from 'react-icons/cg';

type Props = {};

export const ProtectedPage = ({ children }: PropsWithChildren<Props>) => {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (!user?.credential) router.push('/signin');
	}, [user, router]);

	if (!user?.credential)
		return (
			<div className='flex items-center justify-center w-full h-screen animate-spin'>
				<CgSpinner className='w-12 h-12 text-[#64B1EC]' />
			</div>
		);
	return <>{children}</>;
};
