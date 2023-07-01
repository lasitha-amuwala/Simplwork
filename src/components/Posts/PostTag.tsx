import { ReactNode } from 'react';

export const PostTag = ({ text, icon }: { text: string; icon: ReactNode }) => (
	<div className='bg-gray-100 text-gray-500 flex items-center px-2 py-1 rounded-md text-sm gap-1.5'>
		<span className='rounded-full bg-gray-300 p-0.5'>{icon}</span>
		{text}
	</div>
);
