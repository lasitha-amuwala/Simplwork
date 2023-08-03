import { CandaidateAvailibility, ShiftTimes } from '@/src/types/api/candidate';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import { date } from 'yup';

type Props = {};

type DayOfWeekString = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
const getDayOfWeekString = (dayOfWeek: number): DayOfWeekString => {
	const dayOfWeekString: DayOfWeekString[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
	return dayOfWeekString[dayOfWeek - 1];
};

const test = (props: Props) => {
	const startDate = dayjs('2000-01-02').toDate();
	const [schedule, setSchedule] = useState<Array<Date>>([]);
	const [availability, setAvailability] = useState<CandaidateAvailibility>();

	const handleSubmit = () => {
		const availabilityMatrix = computeAvailabilityMatrix(schedule);
		setAvailability(availabilityMatrix);
	};

	const computeAvailabilityMatrix = (arr: Array<Date>): CandaidateAvailibility => {
		let availabilityObject: CandaidateAvailibility = {
			MONDAY: [],
			TUESDAY: [],
			WEDNESDAY: [],
			THURSDAY: [],
			FRIDAY: [],
			SATURDAY: [],
			SUNDAY: [],
		};

		const getStartTime = (date: Date): number => date.getHours() * 60;
		const getEndTime = (date: Date): number => (date.getHours() + 1) * 60;
		const getDayOfWeek = (date: Date): DayOfWeekString => getDayOfWeekString(date.getDay() === 0 ? 7 : date.getDay());

		// convert raw scheduler data to more useful data
		arr.forEach((date) => availabilityObject[getDayOfWeek(date)].push({ startTime: getStartTime(date), endTime: getEndTime(date) }));

		for (const day in availabilityObject as CandaidateAvailibility) {
			const dayArr: Array<ShiftTimes> = availabilityObject[day as DayOfWeekString];
			let currentDate: ShiftTimes = { startTime: 0, endTime: 0 };
			let tempNewArr: Array<ShiftTimes> = [];

			for (let i = 0; i < dayArr.length; i++) {
				const next = i < dayArr.length ? dayArr[i + 1] : null;
				const { startTime, endTime } = dayArr[i];

				if (i === 0) currentDate = { startTime, endTime };

				if (next) {
					const { startTime: nextStartTime, endTime: nextEndTime } = next;
					if (nextEndTime === startTime) {
						currentDate.endTime = nextEndTime;
					} else {
						currentDate.endTime = endTime;
					}
				} else {
					currentDate.endTime = endTime;
				}
				tempNewArr.push(currentDate);
			}
			availabilityObject[day as DayOfWeekString] = tempNewArr;
		}

		// for (let i = 0; i < convertedArr.length; i++) {
		// 	const { startTime, endTime, dayOfWeek } = convertedArr[i];

		// 	const prev = i > 0 ? convertedArr[i - 1] : null;
		// 	const next = i < convertedArr.length ? convertedArr[i + 1] : null;

		// 	if (i === 0) currentDate = { startTime, endTime };

		// 	if (next) {
		// 		const { startTime: nextStartTime, endTime: nextEndTime, dayOfWeek: nextDayOfWeek } = next;
		// 		// check if the current date and next date are the same day of week, if not push and continue
		// 		if (nextDayOfWeek !== dayOfWeek) {
		// 			currentDate.endTime = endTime;
		// 			availabilityObject[getDayOfWeekString(dayOfWeek)].push(currentDate);
		// 			currentDate = { startTime: nextStartTime, endTime: 0 };
		// 			continue;
		// 		} else {
		// 			// check if current date continues to the next date, if so join the two dates, if not push and continue
		// 			if (nextStartTime !== endTime) {
		// 				currentDate.startTime = startTime;
		// 				currentDate.endTime = endTime;
		// 				availabilityObject[getDayOfWeekString(dayOfWeek)].push(currentDate);
		// 			} else {
		// 				currentDate.endTime = nextEndTime;
		// 				continue;
		// 			}
		// 		}
		// 	} else {
		// 		currentDate.endTime = endTime;
		// 		availabilityObject[getDayOfWeekString(dayOfWeek)].push(currentDate);
		// 	}
		// }

		return availabilityObject;
	};

	return (
		<div className='flex flex-col justify-center items-center w-full h-screen'>
			<div className=''>
				<ScheduleSelector
					selection={schedule}
					onChange={setSchedule}
					minTime={0}
					maxTime={12}
					startDate={startDate}
					timeFormat='h:mma'
					dateFormat='dddd'
					hourlyChunks={1}
				/>
			</div>
			{JSON.stringify(availability, null, 2)}
			<button className='button' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

export default test;
