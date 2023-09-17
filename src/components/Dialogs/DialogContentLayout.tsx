import { PropsWithChildren, ReactNode } from 'react';
import DialogContent, { Dialog, DialogDescription, DialogTitle, DialogTrigger } from './Dialog';

export type DialogContentLayoutProps = {
	open: boolean;
	setOpen(arg: boolean): void;
	triggerLabel: string | ReactNode;
	triggerClassName?: string;
	title: string;
	description: string;
};

export const DialogContentLayout = (props: PropsWithChildren<DialogContentLayoutProps>) => (
	<Dialog open={props.open} onOpenChange={props.setOpen}>
		<DialogTrigger asChild>
			<button className={props.triggerClassName ?? 'button'}>{props.triggerLabel}</button>
		</DialogTrigger>
		<BaseDialogContent title={props.title} description={props.description}>
			{props.children}
		</BaseDialogContent>
	</Dialog>
);

export const BaseDialogContent = ({ title, description, children }: PropsWithChildren<{ title: string; description: string }>) => (
	<DialogContent className='flex flex-col gap-3 w-auto h-auto px-5 md:px-10'>
		<div className='min-w-[450px]'>
			<DialogTitle>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
		</div>
		{children}
	</DialogContent>
);
