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

		if (startWeekDay === endWeekDay) {
			if (startDay === endDay) {
				shifts.push(createShift(startWeekDay, startInMinutes, endInMinutes));
			} else {
				shifts.push(createShift(startWeekDay, startInMinutes, 1439));
				for (let i = 1; i < 7; i++) shifts.push(createShift(i, 0, 1439));
			}
		} else {
			let daysInBetween = endWeekDay - startWeekDay - 1;
			let newEndInMinues = endInMinutes;

			if (startWeekDay == 7) {
				daysInBetween = endWeekDay - 1;
			}

			if (endInMinutes === 0) {
				newEndInMinues = 1439;
				daysInBetween -= 1;
			}

			shifts.push(createShift(startWeekDay, startInMinutes, 1439));
			for (let i = 1; i < daysInBetween + 1; i++) shifts.push(createShift(startWeekDay == 7 ? i : startWeekDay + i, 0, 1439));
			shifts.push(createShift(endInMinutes == 0 ? endWeekDay - 1 : endWeekDay, 0, newEndInMinues));
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
