import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarApi, EventSourceInput } from '@fullcalendar/core';
import { convertEventsToShifts } from './logic';
import { RiCloseFill } from 'react-icons/ri';

type AvailabilityWidgetProps = {
	readonly?: boolean;
	events?: EventSourceInput | undefined;
	onChange?: Dispatch<SetStateAction<SW.IAvailability>>;
};

export const AvailabilityWidget = forwardRef(({ events, readonly, onChange }: AvailabilityWidgetProps, ref: ForwardedRef<FullCalendar>) => {
	const onSelect = (selectInfo: any) => {
		const api = selectInfo.view.calendar;
		api.addEvent({ start: selectInfo.start, end: selectInfo.end });
	};

	const renderButton = (selectInfo: any) => {
		const { event, timeText } = selectInfo;
		const removeEvent = () => event.remove();

		return (
			<div className=' relative p-0.5 group/event w-full h-full overflow-hidden'>
				{timeText}
				<button
					className={`absolute right-0 top-0 p-0.5 m-0.5 bg-black rounded-full hidden ${
						!readonly ? 'group-hover/event:block' : 'group-hover:hidden'
					}`}
					onClick={removeEvent}>
					<RiCloseFill className='text-lg' />
				</button>
			</div>
		);
	};

	const getEvents = (): SW.IShift[] => {
		if (ref != null && typeof ref !== 'function' && ref.current) {
			let calendarApi: CalendarApi = ref.current.getApi();
			return convertEventsToShifts(calendarApi.getEvents());
		}
		return [];
	};

	// const handleEventChange = () => onChange && onChange(convertShiftsToAvailability(getEvents()));

	return (
		<FullCalendar
			ref={ref}
			plugins={[timeGridPlugin, interactionPlugin]}
			initialView='timeGridWeek'
			allDaySlot={false}
			slotDuration={'02:00:00'}
			snapDuration={'00:30'}
			editable={!readonly}
			selectable={!readonly}
			droppable={false}
			expandRows={true}
			selectMirror={true}
			unselectAuto={false}
			selectOverlap={false}
			eventOverlap={false}
			headerToolbar={false}
			select={onSelect}
			events={events}
			eventContent={renderButton}
			// eventChange={handleEventChange}
			eventBackgroundColor='#63B3ED'
			eventBorderColor='#4299E1'
			views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
		/>
	);
});

export const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;
