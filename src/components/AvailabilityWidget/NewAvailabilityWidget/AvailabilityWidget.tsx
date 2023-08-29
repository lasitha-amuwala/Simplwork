import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarApi, EventApi } from '@fullcalendar/core';
import { createShift, getDateDetails, shiftToEvent } from './hepers';

type AvailabilityWidgetProps = {
	readonly: boolean;
	events: any;
	backgroundEvents?: any;
};

export const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;

export const AvailabilityWidget = ({ events, backgroundEvents, readonly = false }: AvailabilityWidgetProps) => {
	const calendarRef = useRef(null);

	const onSelect = (selectInfo: unknown) => {
		const api = selectInfo.view.calendar;
		api.addEvent({ start: selectInfo.start, end: selectInfo.end });
		console.log(api.getEvents());
	};

	const renderButton = (selectInfo: unknown) => {
		const { event, timeText } = selectInfo;
		return (
			<div className=''>
				{timeText}
				<button onClick={() => event.remove()}>remove</button>
			</div>
		);
	};

	const getEvents = () => {
		if (!calendarRef || !calendarRef.current) return;
		let calendarApi: CalendarApi = calendarRef.current.getApi();
		const events = calendarApi.getEvents();

		let shifts: SW.IShift[] = [];
		events.forEach((event: EventApi) => {
			const { day: startDay, minuteOfDay: startInMinutes } = getDateDetails(new Date(event.startStr));
			const { day: endDay, minuteOfDay: endInMinutes } = getDateDetails(new Date(event.endStr));

			if (startDay === endDay) {
				shifts.push(createShift(startDay, startInMinutes, endInMinutes));
			} else {
				const daysBetween = endDay - startDay - 1;
				shifts.push(createShift(startDay, startInMinutes, 1440));
				for (let i = 0; i < daysBetween; i++) {
					shifts.push(createShift(startDay + 1 + i, 0, 1440));
				}
				shifts.push(createShift(endDay, 0, endInMinutes));
			}
		});

		console.log(shifts);
	};

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
			events={[...events]}
			eventContent={renderButton}
			eventDataTransform={shiftToEvent}
			views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
		/>
	);
};
