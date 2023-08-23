import { PropsWithChildren } from 'react';

type HeaderWithButtonProps = { title: string };

export const HeaderWithButton = ({ title, children }: PropsWithChildren<HeaderWithButtonProps>) => {
	return (
		<div className='flex items-end pb-3'>
			<h1 className='text-2xl font-semibold grow'>{title}</h1>
			{children}
		</div>
	);
};
