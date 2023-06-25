import React from 'react';
import Image from 'next/image';

type AuthCardProps = React.PropsWithChildren<{
	title: string;
	subtitle: string;
}>;

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='bg-[#64B1EC] bg-opacity-[22%] p-3 rounded-lg'>
				<Image src='./icon.svg' alt='icon' width={45} height={45}></Image>
			</div>
			<h3 className='text-2xl pt-3 font-medium'>{title}</h3>
			<p className='pt-1 pb-5'>{subtitle}</p>
			{children}
		</div>
	);
};
