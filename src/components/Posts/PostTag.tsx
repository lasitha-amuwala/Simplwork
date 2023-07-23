import { ReactNode, PropsWithChildren } from 'react';

type PostTagProps = { icon: ReactNode };

export const PostTag = ({ children, icon }: PropsWithChildren<PostTagProps>) => (
	<div className='bg-sw-600/10 text-gray-700 flex justify-center items-center px-2 py-1.5 rounded-full text-xs font-medium tracking-wider gap-1.5 pointer-events-none'>
		<span className='rounded-full bg-sw-900/20 text-base p-1'>{icon}</span>
		{children}
	</div>
);
