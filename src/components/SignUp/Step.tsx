import { PropsWithChildren } from 'react';

export const Step = ({ children }: PropsWithChildren<{}>) => {
	return <div className='w-[450px] max-w-[450px] flex flex-col gap-5'>{children}</div>;
};
