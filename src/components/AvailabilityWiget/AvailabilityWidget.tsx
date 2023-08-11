import { useState, memo } from 'react';
import { CandaidateAvailibility } from '../../types/api/candidate';
import { computeAvailabilityToSchedule, computeScheduleToAvailability, getHourlyChunk } from './helpers';
import ScheduleSelector from 'react-schedule-selector';
import dayjs from 'dayjs';

export type AvailabilityWidgetProps = {
	hourlyChunks?: number;
	readonly?: boolean;
	availability?: CandaidateAvailibility;
	onChange?: (arg: CandaidateAvailibility) => void;
};

const AvailabilityWidgetBase = ({ availability, hourlyChunks = 1, readonly, onChange }: AvailabilityWidgetProps) => {
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
};

export const AvailabilityWidget = memo(AvailabilityWidgetBase);
