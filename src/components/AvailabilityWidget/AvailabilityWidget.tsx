import { memo } from 'react';
import dayjs from 'dayjs';
import ScheduleSelector from 'react-schedule-selector';
import { computeAvailabilityToSchedule, computeScheduleToAvailability } from './helpers';
import { AvailabilityWidgetProps } from './types';

export const AvailabilityWidget = memo(({ availability, hourlyChunks = 1, readonly, onChange }: AvailabilityWidgetProps) => {
	const startDate = dayjs('2000-01-02').toDate();
	const schedule: Date[] = availability ? computeAvailabilityToSchedule(availability, startDate, hourlyChunks) : [];

	const handleOnChange = (schedule: Date[]) => onChange && onChange(computeScheduleToAvailability(schedule, hourlyChunks));

	return (
		<div className={`${readonly && 'pointer-events-none touch-none cursor-none'} w-full h-auto`}>
			<ScheduleSelector
				selection={schedule}
				onChange={handleOnChange}
				minTime={0}
				maxTime={24}
				startDate={startDate}
				timeFormat='h:mm a'
				dateFormat='ddd'
				hourlyChunks={hourlyChunks}
			/>
		</div>
	);
});

AvailabilityWidget.displayName = 'AvailabilityWidget';
export const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;
