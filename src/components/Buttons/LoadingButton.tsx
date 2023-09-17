import { CgSpinner } from 'react-icons/cg';
import { twMerge } from 'tailwind-merge';

export const LoadingButton = ({
	text,
	disabled = false,
	className,
	...rest
}: {
	text: string;
	disabled?: boolean;
	className?: string;
	[key: string]: any;
}) => {
	return (
		<button
			{...rest}
			disabled={disabled}
			className={twMerge(
				className,
				'inline-flex justify-center items-center group py-2 px-3 rounded font-medium button disabled:pointer-events-none group-disabled:pointer-events-none'
			)}>
			<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
			<span className='group-disabled:opacity-0'>{text}</span>
		</button>
	);
};
