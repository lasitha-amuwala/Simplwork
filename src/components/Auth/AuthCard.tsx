import { PropsWithChildren } from 'react';
import Image from 'next/image';

type AuthCardProps = PropsWithChildren<{
	title: string;
	subtitle: string;
}>;

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
	return (
		<div className='flex flex-col gap-5 items-center p-10 bg-white rounded-xl border border-gray-200 max-w-xs text-center'>
			<div className='bg-[#64B1EC] bg-opacity-[22%] p-3 rounded-lg'>
				<Image src='/icon.svg' alt='icon' width={45} height={45}></Image>
			</div>
			<div>
				<h3 className='text-2xl pt-3 font-medium'>{title}</h3>
				<p className='pt-2 text-md text-gray-600'>{subtitle}</p>
			</div>
			{children}
		</div>
	);
};
