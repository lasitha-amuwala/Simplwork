// import React, { PropsWithChildren } from 'react';
// import * as SelectPrimitive from '@radix-ui/react-select';
// import { RxCheck, RxChevronDown, RxChevronUp } from 'react-icons/rx';

// export const Select = React.forwardRef<HTMLButtonElement, PropsWithChildren>(({ children, ...props }, forwardedRef) => {
// 	return (
// 		<SelectPrimitive.Root {...props}>
// 			<SelectPrimitive.Trigger
// 				ref={forwardedRef}
// 				className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none h-[35px] gap-[5px] bg-white shadow-[0_0_0_1px] shadow-black hover:bg-gray-50 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black outline-none'>
// 				<SelectPrimitive.Value />
// 				<SelectPrimitive.Icon>
// 					<RxChevronDown />
// 				</SelectPrimitive.Icon>
// 			</SelectPrimitive.Trigger>
// 			<SelectPrimitive.Portal>
// 				<SelectPrimitive.Content className='overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
// 					<SelectPrimitive.ScrollUpButton className='flex items-center justify-center h-[25px]  bg-slate-300 cursor-default'>
// 						<RxChevronUp />
// 					</SelectPrimitive.ScrollUpButton>
// 					<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
// 					<SelectPrimitive.ScrollDownButton className='flex items-center justify-center h-[25px] bg-slate-300 cursor-default'>
// 						<RxChevronDown />
// 					</SelectPrimitive.ScrollDownButton>
// 				</SelectPrimitive.Content>
// 			</SelectPrimitive.Portal>
// 		</SelectPrimitive.Root>
// 	);
// });

// export const SelectItem = React.forwardRef<HTMLDivElement, PropsWithChildren<{ value: string; className?: string }>>(
// 	({ children, className, ...props }, forwardedRef) => {
// 		return (
// 			<SelectPrimitive.Item
// 				className={`${className} text-[13px] leading-none text-balck rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-sky-100 data-[highlighted]:text-sky-600`}
// 				{...props}
// 				ref={forwardedRef}>
// 				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
// 				<SelectPrimitive.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
// 					<RxCheck />
// 				</SelectPrimitive.ItemIndicator>
// 			</SelectPrimitive.Item>
// 		);
// 	}
// );
