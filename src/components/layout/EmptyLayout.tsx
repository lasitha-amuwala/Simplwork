import { ReactElement } from 'react';

export const EmptyLayout = ({ children }: { children: ReactElement }) => (
	<div className='flex justify-center items-center min-h-screen h-screen w-full'>{children}</div>
);
