// @ts-nocheck

import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarApi } from '@fullcalendar/core';
import { convertShiftToEvent, convertAvailabilityToShifts, convertShiftsToAvailability, convertEventsToShifts } from './logic';

type AvailabilityWidgetProps = {
	readonly: boolean;
	events?: any;
	backgroundEvents?: any;
	availability?: SW.IAvailability;
	onChange?: Dispatch<SetStateAction<SW.IAvailability>>;
};

export const getEventsAsAvailability = () => {};

export const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;
export const AvailabilityWidget = ({
	events = [],
	backgroundEvents,
	availability = [],
	readonly = false,
	onChange,
}: AvailabilityWidgetProps) => {
	const calendarRef = useRef(null);

	const onSelect = (selectInfo: any) => {
		const api = selectInfo.view.calendar;
		api.addEvent({ start: selectInfo.start, end: selectInfo.end });
		onChange(convertShiftsToAvailability(getEvents()));
	};

	const renderButton = (selectInfo: any) => {
		const { event, timeText } = selectInfo;
		return (
			<div className=''>
				{timeText}
				<button onClick={() => event.remove()}>remove</button>
			</div>
		);
	};

	const getEvents = (): SW.IShift[] => {
		if (!calendarRef || !calendarRef.current) return;
		let calendarApi: CalendarApi = calendarRef.current.getApi();
		return convertEventsToShifts(calendarApi.getEvents());
	};

	const handleEventChange = () => onChange(convertShiftsToAvailability(getEvents()));

	return (
		<FullCalendar
			ref={calendarRef}
			plugins={[timeGridPlugin, interactionPlugin]}
			initialView='timeGridWeek'
			allDaySlot={false}
			slotDuration={'01:00:00'}
			snapDuration={'00:30'}
			editable={true}
			expandRows={true}
			selectable={!readonly}
			selectMirror={true}
			unselectAuto={false}
			selectOverlap={false}
			eventOverlap={false}
			headerToolbar={false}
			select={onSelect}
			events={[...events, ...convertAvailabilityToShifts(availability)]}
			eventContent={renderButton}
			eventChange={handleEventChange}
			eventDataTransform={convertShiftToEvent}
			views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
		/>
	);
};
