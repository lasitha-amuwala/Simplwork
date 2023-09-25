import { EventApi, EventInput } from '@fullcalendar/core';
import { getWeekDay } from '@utils/helpers';
import dayjs from 'dayjs';

// Getters

const dayOfWeekStrings: SW.DayOfWeekString[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const getCustomDayNumber = (day: number): number => getWeekDay(day).day();

export const getDayStringByNumber = (dayOfWeek: number): SW.DayOfWeekString => dayOfWeekStrings[dayOfWeek - 1];

export const getDayNumberByString = (dayOfWeek: SW.DayOfWeekString): number => {
	const index = dayOfWeekStrings.indexOf(dayOfWeek);
	if (index == -1) throw new Error(`string ${dayOfWeek} is not a day of the week`);
	return index + 1;
};

export const getDateDetails = (date: Date) => {
	const newDate = dayjs(date);
	const minuteOfDay = newDate.hour() * 60 + newDate.minute();
	return {
		day: newDate.date(),
		dayOfWeek: newDate.isoWeekday(),
		minuteOfDay: minuteOfDay == 1440 ? 1439 : minuteOfDay,
	};
};

// Converstion Logic

// convert shift to event object from fullCalender
export const convertShiftToEvent = (eventData: EventInput) => {
	const { dayOfWeek, shiftTimes } = eventData as SW.IShift;
	const event = {
		title: '',
		start: convertShiftTimeToDate(dayOfWeek, shiftTimes.startTime),
		end: convertShiftTimeToDate(dayOfWeek, shiftTimes.endTime == 1440 ? 1439 : shiftTimes.endTime),
	};
	return event;
};

export const convertEventsToShifts = (events: EventApi[]): SW.IShift[] => {
	let shifts: SW.IShift[] = [];

	events.forEach((event: EventApi) => {
		const { day: startDay, dayOfWeek: startWeekDay, minuteOfDay: startInMinutes } = getDateDetails(new Date(event.startStr));
		const { day: endDay, dayOfWeek: endWeekDay, minuteOfDay: endInMinutes } = getDateDetails(new Date(event.endStr));

		/* logic to help with annoying midnights, 
			 Problem 1: The calender widget converts any day at midnight to the following day at 0 minutes.
			 ex. Saturday at midnight is converted to next Sunday at 0 minutes, next Sunday is not shown on the widget (problem)
			 Problem 2: The calender widget starts its week on Sunday and ends on Saturday, while the backend is setup so monday
			 is the first day of the week and sunday is the last. This discrepency causes issues when selecting a shift from sunday
			 to any other day
			 Problem 3: this problem is a result of problem 2, if today is Sunday, the calender thinks its Sunday of next week. Because
			 again the calender follows sunday to saturday week, while server follows monday to sunday. Sundays are annoying
			 Possible Solution: make the backend week start on sunday. This is solve all the issues and make the logic MUCH simpler	*/

		// if selection is only within one day
		if (startWeekDay === endWeekDay) {
			if (startDay === endDay) {
				shifts.push(createShift(startWeekDay, startInMinutes, endInMinutes));
			} else {
				// adjust for problem 3
				shifts.push(createShift(startWeekDay, startInMinutes, 1439));
				for (let i = 1; i < 7; i++) shifts.push(createShift(i, 0, 1439));
			}
		} else {
			if (startWeekDay == 7 && endWeekDay < 7) {
				// for a selection starting on Sunday and ending before next Sunday

				// create shift for sunday till midnight
				shifts.push(createShift(7, startInMinutes, 1439));
				// create shifts between monday and endWeekDay
				for (let i = 1; i < endWeekDay; i++) shifts.push(createShift(i, 0, 1439));
				// create shift for endWeekDay only if endInMinutes is not 0, if 0 then it was already covered by the for loop
				if (endInMinutes !== 0) shifts.push(createShift(endWeekDay, 0, endInMinutes));
			} else if (startWeekDay < 7 && endWeekDay == 7) {
				// for a selection starting after Sunday but ending on next Sunday

				// create shift for starting day
				shifts.push(createShift(startWeekDay, startInMinutes, 1439));
				// create shift for everyday till saturday at midnight
				for (let i = startWeekDay + 1; i < endWeekDay; i++) shifts.push(createShift(i, 0, 1439));
			} else {
				// create shift for starting day
				shifts.push(createShift(startWeekDay, startInMinutes, 1439));
				// create shift for everyday till endWeekDay at midnight
				for (let i = startWeekDay + 1; i < endWeekDay; i++) shifts.push(createShift(i, 0, 1439));
				// create shift for endWeekDay only if endInMinutes is not 0, if 0 then it was already covered by the for loop
				if (endInMinutes !== 0) shifts.push(createShift(endWeekDay, 0, endInMinutes));
			}
		}
	});
	return shifts;
};

// convert minutes in a day to a date object
export const convertShiftTimeToDate = (day: number, minutes: number) =>
	dayjs()
		.startOf('week')
		.day(day == 7 ? 0 : day)
		.hour(Math.floor(minutes / 60))
		.minute(minutes % 60)
		.second(0)
		.millisecond(0)
		.toDate();

// convert availibility object to list of shits, opposite of convertShiftsToAvailability
export const convertAvailabilityToShifts = (availability: SW.IAvailability | undefined): SW.IShift[] => {
	const shifts: SW.IShift[] = [];
	if (!availability) return shifts;
	Object.entries(availability).forEach(([dayOfWeek, shiftTimes]) => {
		shiftTimes.forEach(({ startTime, endTime }: SW.IShiftTime) =>
			shifts.push(createShift(getDayNumberByString(dayOfWeek as SW.DayOfWeekString), startTime, endTime))
		);
	});
	return shifts;
};

// convert list of shifts to Availability object, opposite of convertAvailabilityToShifts
export const convertShiftsToAvailability = (shifts: SW.IShift[]): SW.IAvailability => {
	const availabilityObject = createAvailabilityObject();
	shifts.forEach(({ dayOfWeek, shiftTimes }) => availabilityObject[getDayStringByNumber(dayOfWeek)].push(shiftTimes));
	return availabilityObject;
};

// Other

export const createShift = (dayOfWeek: number, startTime: number, endTime: number): SW.IShift => ({
	dayOfWeek,
	shiftTimes: { startTime, endTime },
});

export const createAvailabilityObject = (): SW.IAvailability => {
	return { MONDAY: [], TUESDAY: [], WEDNESDAY: [], THURSDAY: [], FRIDAY: [], SATURDAY: [], SUNDAY: [] };
};
