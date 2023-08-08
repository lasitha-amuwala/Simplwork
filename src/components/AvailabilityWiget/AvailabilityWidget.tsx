import { useState, memo } from 'react';
import { CandaidateAvailibility } from '../../types/api/candidate';
import { computeAvailabilityToSchedule, computeScheduleToAvailability, getHourlyChunk } from './helpers';
import ScheduleSelector from 'react-schedule-selector';
import dayjs from 'dayjs';

export type AvailabilityWidgetProps = {
	hourlyChunks?: number;
	availability?: CandaidateAvailibility;
	readonly?: boolean;
};

export const AvailabilityWidget = memo(({ availability, hourlyChunks = 1, readonly }: AvailabilityWidgetProps) => {
	const startDate = dayjs('2000-01-02').toDate();
	const [schedule, setSchedule] = useState<Date[]>(availability ? computeAvailabilityToSchedule(availability, startDate, hourlyChunks) : []);

	const handleSubmit = () => computeScheduleToAvailability(schedule, hourlyChunks);

	return (
		<div className={`${readonly && 'pointer-events-none'} w-full h-auto`}>
			<ScheduleSelector
				selection={schedule}
				onChange={setSchedule}
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
