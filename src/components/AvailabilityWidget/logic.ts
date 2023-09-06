import { EventApi, EventInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

// Getters

const dayOfWeekStrings: SW.DayOfWeekString[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const getCustomDayNumber = (day: number): number => (day == 0 ? 7 : day);

export const getDayStringByNumber = (dayOfWeek: number): SW.DayOfWeekString => dayOfWeekStrings[dayOfWeek - 1];

export const getDayNumberByString = (dayOfWeek: SW.DayOfWeekString): number => {
	const index = dayOfWeekStrings.indexOf(dayOfWeek);
	if (index == -1) throw new Error(`string ${dayOfWeek} is not a day of the week`);
	return index + 1;
};

export const getDateDetails = (date: Date) => ({
	day: getCustomDayNumber(date.getDay()),
	hour: date.getHours(),
	minuteOfDay: date.getHours() * 60 + date.getMinutes(),
});

// Converstion Logic

// convert shift to event object from fullCalender
export const convertShiftToEvent = (eventData: EventInput) => {
	const shift = eventData as SW.IShift;
	return {
		title: '',
		start: convertShiftTimeToDate(shift.dayOfWeek, shift.shiftTimes.startTime),
		end: convertShiftTimeToDate(shift.dayOfWeek, shift.shiftTimes.endTime),
	};
};

export const convertEventsToShifts = (events: EventApi[]): SW.IShift[] => {
	let shifts: SW.IShift[] = [];
	events.forEach((event: EventApi) => {
		const { day: startDay, minuteOfDay: startInMinutes } = getDateDetails(new Date(event.startStr));
		const { day: endDay, minuteOfDay: endInMinutes } = getDateDetails(new Date(event.endStr));

		if (startDay === endDay) {
			shifts.push(createShift(startDay, startInMinutes, endInMinutes));
		} else {
			const daysBetween = endDay - startDay - 1;
			if (endInMinutes === 0 && daysBetween === 0) {
				shifts.push(createShift(startDay, startInMinutes, 1440));
			} else {
				shifts.push(createShift(startDay, startInMinutes, 1440));
				for (let i = 0; i < daysBetween; i++) {
					shifts.push(createShift(startDay + 1 + i, 0, 1440));
				}
				shifts.push(createShift(endDay, 0, endInMinutes));
			}
		}
	});
	return shifts;
};

// convert minutes in a day to a date object
export const convertShiftTimeToDate = (day: number, minutes: number) => {
	const hour = Math.floor(minutes / 60);
	return dayjs()
		.day(day)
		.hour(hour)
		.minute(minutes - hour * 60)
		.second(0)
		.millisecond(0)
		.toDate();
};

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
