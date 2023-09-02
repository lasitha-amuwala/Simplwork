import { PropsWithChildren, ReactNode } from 'react';
import DialogContent, { Dialog, DialogDescription, DialogTitle, DialogTrigger } from './Dialog';

type DialogTemplate = {
	open: boolean;
	setOpen: (arg: boolean) => void;
	triggerLabel: string | ReactNode;
	triggerClassName?: string;
	title: string;
	description: string;
};

export const DialogContentLayout = ({
	open,
	setOpen,
	triggerLabel: triggerText,
	title,
	description,
	triggerClassName,
	children,
}: PropsWithChildren<DialogTemplate>) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className={triggerClassName ?? 'button'}>{triggerText}</button>
			</DialogTrigger>
			<DialogContent className='w-auto px-5 md:px-10'>
				<div className='flex flex-col justify-center items-center'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</div>
				{children}
			</DialogContent>
		</Dialog>
	);
};
