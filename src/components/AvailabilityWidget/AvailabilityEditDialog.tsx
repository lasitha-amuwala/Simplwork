import React, { useRef, useState, FormEvent } from 'react';
import { AvailabilityWidget, AvailabilityWidgetProps } from './AvailabilityWidget';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { CalendarApi } from '@fullcalendar/core';
import { convertEventsToShifts } from './logic';
import { SaveChangesButton } from '@components/Buttons/SaveChangesButton';
import FullCalendar from '@fullcalendar/react';

type AvailabilityEditDialogProps = {
	onSave: (shifts: SW.IShift[]) => void;
	isLoading: boolean;
} & AvailabilityWidgetProps;

export const AvailabilityEditDialog = ({ onSave, isLoading, ...rest }: AvailabilityEditDialogProps) => {
	const [open, setOpen] = useState(false);

	const calendarRef = useRef<FullCalendar | null>(null);

	const getEvents = (): SW.IShift[] => {
		if (!calendarRef || !calendarRef.current) return [];
		let calendarApi: CalendarApi = calendarRef.current.getApi();
		const events = calendarApi.getEvents()
		console.log(events)
		return convertEventsToShifts(events);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave(getEvents());
		setOpen(false);
	};

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex justify-between'>
				<h1 className='text-2xl font-semibold self-center'>Availability</h1>
				<DialogContentLayout
					open={open}
					setOpen={setOpen}
					title='Edit Availability'
					description='Select the time and days that you are available to work.'
					triggerLabel='Edit Availability'>
					<fieldset className='group' disabled={isLoading}>
						<form onSubmit={onSubmit} className='w-[50vw] flex flex-col gap-3'>
							<AvailabilityWidget ref={calendarRef} {...rest} />
							<div className='self-end'>
								<SaveChangesButton />
							</div>
						</form>
					</fieldset>
				</DialogContentLayout>
			</div>
			<AvailabilityWidget ref={calendarRef} {...rest} readonly />
		</div>
	);
};
