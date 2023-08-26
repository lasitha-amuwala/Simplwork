import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarApi } from '@fullcalendar/core';

type Props = {};

export const AvailabilityWidget = (props: Props) => {
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
		if (!calendarRef.current) return;
		let calendarApi: CalendarApi = calendarRef.current.getApi();
		const events = calendarApi.getEvents();

		events.forEach((event) => {
			const { start, end } = event;
      console.log(event)
			const startMinute = start?.getHours();
			const endMinute = end?.getHours();

      

			console.log(startMinute, endMinute);
		});
	};

	return (
		<>
			<FullCalendar
				ref={calendarRef}
				plugins={[timeGridPlugin, interactionPlugin]}
				initialView='timeGridWeek'
				allDaySlot={false}
				slotDuration={'01:00:00'}
				snapDuration={'00:30'}
				editable={true}
				expandRows={true}
				selectable={true}
				selectMirror={true}
				unselectAuto={false}
				selectOverlap={false}
				eventOverlap={false}
				headerToolbar={false}
				eventContent={renderButton}
				views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
				select={onSelect}
			/>
			<button onClick={getEvents}>Get Events</button>
		</>
	);
};
