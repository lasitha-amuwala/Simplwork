import { EventInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

export const getDateDetails = (date: Date) => ({
	day: date.getDay(),
	hour: date.getHours(),
	minuteOfDay: date.getHours() * 60 + date.getMinutes(),
});

export const createShift = (dayOfWeek: number, startTime: number, endTime: number): SW.IShift => ({
	dayOfWeek,
	shiftTimes: { startTime, endTime },
});

export const shiftToEvent = (eventData: EventInput) => {
	const shift = eventData as SW.IShift;
	return {
		title: '',
		start: convertShiftTimeToDate(shift.dayOfWeek, shift.shiftTimes.startTime),
		end: convertShiftTimeToDate(shift.dayOfWeek, shift.shiftTimes.endTime),
	};
};

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

export const availabilityToShifts = (availability: SW.IAvailability): SW.IShift[] => {
  
  return {} as SW.IShift[]
};
