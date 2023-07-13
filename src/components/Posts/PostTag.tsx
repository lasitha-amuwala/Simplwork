import React, { ReactNode } from 'react';

type PostTagProps = { icon: ReactNode };

export const PostTag = ({ children, icon }: React.PropsWithChildren<PostTagProps>) => (
	<div className='bg-gray-100 text-gray-700 flex items-center px-2 py-1.5 rounded-full text-xs font-medium tracking-wider gap-1.5'>
		<span className='rounded-full bg-gray-300 text-base p-0.5'>{icon}</span>
		{children}
	</div>
);
