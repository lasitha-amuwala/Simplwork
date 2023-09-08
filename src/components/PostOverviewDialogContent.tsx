import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

type Props = {};

export const PostOverviewDialogContent = (props: Props) => {
	return (
		<Tabs.Root className='flex flex-col w-full ' defaultValue='tab1'>
			<Tabs.List className='shrink-0 flex ' aria-label='Manage your account'>
				<Tabs.Trigger
					className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default'
					value='tab1'>
					New
				</Tabs.Trigger>
				<Tabs.Trigger
					className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default'
					value='tab2'>
					Reviewed
				</Tabs.Trigger>
				<Tabs.Trigger
					className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default'
					value='tab3'>
					Interview Requested
				</Tabs.Trigger>
				<Tabs.Trigger
					className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default'
					value='tab4'>
					Ready For Interview
				</Tabs.Trigger>
				<Tabs.Trigger
					className='bg-white  px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:text-sw-500 outline-none cursor-default'
					value='tab5'>
					Rejected
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content className='grow p-5 bg-white rounded-b-md outline-none' value='tab1'>
				New
			</Tabs.Content>
			<Tabs.Content className='grow p-5 bg-white rounded-b-md outline-none' value='tab2'>
				Reviewed
			</Tabs.Content>
			<Tabs.Content className='grow p-5 bg-white rounded-b-md outline-none' value='tab3'>
				Interview Requested
			</Tabs.Content>
			<Tabs.Content className='grow p-5 bg-white rounded-b-md outline-none' value='tab4'>
				Ready For Interview
			</Tabs.Content>
			<Tabs.Content className='grow p-5 bg-white rounded-b-md outline-none' value='tab5'>
				Rejected
			</Tabs.Content>
		</Tabs.Root>
	);
};
