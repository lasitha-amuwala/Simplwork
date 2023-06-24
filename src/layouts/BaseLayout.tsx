import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/Auth/AuthProvider';

type Props = {
	children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
	const { user } = useAuth();

	return (
		<>
			{user && <Navbar />}
			<main className={`flex w-full justify-center ${user && 'pt-[var(--header-height)] mb-20'} px-2 md:px-5`}>
				<div className='max-w-[1440px] w-full'>{children}</div>
			</main>
		</>
	);
};
