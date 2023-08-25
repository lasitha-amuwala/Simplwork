import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

type Props = {};

const Test = (props: Props) => {
	const onSelect = (selectInfo: unknown) => {
		const api = selectInfo.view.calendar;
		api.addEvent({ start: selectInfo.start, end: selectInfo.end });
		console.log(api.getEvents());
	};

	const renderButton = (selectInfo) => {
		const { event, timeText } = selectInfo;
		return (
			<div className=''>
				{timeText}
				<button onClick={() => event.remove()}>remove</button>
			</div>
		);
	};


	return (
		<>
			<div className='p-10 w-screen h-screen'>
				<FullCalendar
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
          now={()=>{return "2018";}}
					views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
					select={onSelect}
				/>
			</div>
		</>
	);
};

export default Test;
