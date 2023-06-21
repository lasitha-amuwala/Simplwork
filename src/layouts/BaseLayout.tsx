import React from 'react';
import Navbar from '../components/Navbar';

type Props = {
	children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<main className='flex w-full min-h-screen justify-center pt-[var(--header-height)] px-2 md:px-5'>
				<div className='max-w-[1440px] w-full'>{children}</div>
			</main>
		</>
	);
};
