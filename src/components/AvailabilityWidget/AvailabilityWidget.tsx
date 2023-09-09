import React, { ForwardedRef, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { convertAvailabilityToShifts, convertShiftToEvent } from './logic';
import { RiCloseFill } from 'react-icons/ri';

export type AvailabilityWidgetProps = {
	readonly?: boolean;
	shifts?: SW.IShift[];
	availability?: SW.IAvailability;
};

export const AvailabilityWidget = forwardRef(
	({ shifts = [], readonly, availability }: AvailabilityWidgetProps, ref: ForwardedRef<FullCalendar>) => {
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

		return (
			<FullCalendar
				ref={ref}
				select={onSelect}
				editable={!readonly}
				selectable={!readonly}
				eventContent={renderButton}
				plugins={[timeGridPlugin, interactionPlugin]}
				views={{ timeGridWeek: { dayHeaderFormat: { weekday: 'short' } } }}
				aspectRatio={80 / 50}
				snapDuration={'00:30'}
				slotDuration={'02:00:00'}
				initialView='timeGridWeek'
				expandRows={true}
				droppable={false}
				allDaySlot={false}
				selectMirror={true}
				unselectAuto={false}
				eventOverlap={false}
				selectOverlap={false}
				headerToolbar={false}
				eventResizableFromStart={true}
				eventBorderColor='#4299E1'
				eventBackgroundColor='#63B3ED'
				eventDataTransform={convertShiftToEvent}
				eventSources={[{ events: shifts, backgroundColor: '#3182CE' }, { events: convertAvailabilityToShifts(availability) }]}
			/>
		);
	}
);

export const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;

AvailabilityWidget.displayName = 'AvailabilityWidget';
