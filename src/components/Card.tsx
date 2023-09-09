import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = PropsWithChildren<{
	className: string;
}>;

export const Card = ({ className, children }: Props) => {
	return <div className={twMerge('bg-white rounded-xl shadowSmooth text-gray-800 border-[1.9px] p-5', className)}>{children}</div>;
};
