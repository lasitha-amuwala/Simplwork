import { PropsWithChildren } from 'react';
import Navbar from '../Navbar';
import { useAuth } from '../Auth/AuthProvider';

type Props = {};

export const BaseLayout = ({ children }: PropsWithChildren<Props>) => {
	const { user } = useAuth();

	return (
		<>
			{user && <Navbar />}
			<main className={`flex w-full justify-center ${user && 'pt-[var(--header-height)]'} px-3 md:px-5`}>
				<div className='max-w-[1300px] w-full'>{children}</div>
			</main>
		</>
	);
};
