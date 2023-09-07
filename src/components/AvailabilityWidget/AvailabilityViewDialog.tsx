import React, { useRef, useState } from 'react';
import { AvailabilityWidget, AvailabilityWidgetProps } from './AvailabilityWidget';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import FullCalendar from '@fullcalendar/react';

export const AvailabilityViewDialog = (props: AvailabilityWidgetProps) => {
	const [open, setOpen] = useState(false);
	const calendarRef = useRef<FullCalendar | null>(null);

	const renderWidget = () => <AvailabilityWidget ref={calendarRef} {...props} readonly />;

	return (
		<div>
			<div className='flex justify-between pb-2'>
				<h1 className='text-lg font-semibold self-end'>Availability</h1>
				<div className='flex gap-3 self-end'>
					<div className='w-3 h-3 bg-[#3182CE] rounded-full' />
					<h1 className='font-medium text-sm'>Job Shfit Schedule</h1>
					<div className='w-3 h-3 ml-5 bg-[#63B3ED] rounded-full' />
					<h1 className='font-medium'>My Availability</h1>
				</div>
				<DialogContentLayout open={open} setOpen={setOpen} title='View Availability' description='' triggerLabel='Expand'>
					<div className='h-auto w-[60vw] max-w-5xl'>{renderWidget()}</div>
				</DialogContentLayout>
			</div>
			{renderWidget()}
		</div>
	);
};
