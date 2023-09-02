import React, { useRef, useState } from 'react';
import { AvailabilityWidget } from './AvailabilityWidget';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import FullCalendar from '@fullcalendar/react';
import { EventSourceInput } from '@fullcalendar/core';

type AvailabilityExpandDialogProps = {
	events: EventSourceInput;
};

export const AvailabilityExpandDialog = ({ events }: AvailabilityExpandDialogProps) => {
	const [open, setOpen] = useState(false);
	const calendarRef = useRef<FullCalendar | null>(null);

	// const getEvents = (): SW.IShift[] => {
	// 	if (!calendarRef || !calendarRef.current) return [];
	// 	let calendarApi: CalendarApi = calendarRef.current.getApi();
	// 	console.log(convertEventsToShifts(calendarApi.getEvents()));
	// 	return convertEventsToShifts(calendarApi.getEvents());
	// };

	const renderWidget = () => <AvailabilityWidget ref={calendarRef} events={events} readonly />;

	return (
		<>
			<div className='flex justify-between pb-2'>
				<h1 className='text-2xl font-semibold self-center'>Availability</h1>
				<DialogContentLayout open={open} setOpen={setOpen} title='View Availability' description='' triggerLabel='Expand'>
					<div className='h-auto w-[50vw]'>{renderWidget()}</div>
				</DialogContentLayout>
			</div>
			{renderWidget()}
		</>
	);
};
