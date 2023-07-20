import React, { PropsWithChildren } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RxCross2 } from 'react-icons/rx';

type DialogContentProps = { className?: string };
type DialogTitleProps = { children: string };
type DialogDescriptionProps = { children: string };

const DialogContent = React.forwardRef<HTMLDivElement, PropsWithChildren<DialogContentProps>>(
	({ className, children, ...props }, forwardedRef) => {
		return (
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className='bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0' />
				<DialogPrimitive.Content
					{...props}
					ref={forwardedRef}
					className={`${className} data-[state=open]:animate-contentShow overflow-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}>
					{children}
					<DialogPrimitive.Close aria-label='Close' asChild>
						<button
							className='text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
							aria-label='Close'>
							<RxCross2 />
						</button>
					</DialogPrimitive.Close>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		);
	}
);

export const DialogTitle = ({ children }: DialogTitleProps) => {
	return <DialogPrimitive.Title className='text-black m-0 text-2xl font-medium'>{children}</DialogPrimitive.Title>;
};

export const DialogDescription = ({ children }: DialogDescriptionProps) => {
	return <DialogPrimitive.Description className='text-gray-500'>{children}</DialogPrimitive.Description>;
};

DialogContent.displayName = 'DialogContent';
export default DialogContent;
export const Dialog = DialogPrimitive.Root;
export const DialogClose = DialogPrimitive.Close;
export const DialogTrigger = DialogPrimitive.Trigger;
