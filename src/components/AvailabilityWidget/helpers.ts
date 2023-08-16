import dayjs from 'dayjs';

export const getHourlyChunk = (hourlyChunks: number): number => Math.floor(60 / hourlyChunks);

export const getDayOfWeekString = (dayOfWeek: number): SW.DayOfWeekString => {
	const dayOfWeekString: SW.DayOfWeekString[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
	return dayOfWeekString[dayOfWeek - 1];
};

export const computeAvailabilityToSchedule = (availabilityObject: SW.IAvailability, startDate: Date, hourlyChunk: number): Date[] => {
	const schedule: Date[] = [];
	const convertShiftTimeToDate = (day: number, minute: number) => dayjs(startDate).day(day).minute(minute).toDate();

	const chunk = getHourlyChunk(hourlyChunk);
	Object.keys(availabilityObject).forEach((keys, i) => {
		if (availabilityObject[keys as SW.DayOfWeekString].length < 1) return;
		availabilityObject[keys as SW.DayOfWeekString].forEach(({ startTime, endTime }: SW.IShiftTimes) => {
			const diff = endTime - startTime;
			const numChunk = Math.floor(diff / chunk);
			const day = i == 6 ? 0 : i + 1;
			if (diff > chunk) {
				for (let i = 0; i < numChunk; i++) {
					const minutes = startTime + chunk * i;
					const date = convertShiftTimeToDate(day, minutes);
					schedule.push(date);
				}
			} else {
				const date = convertShiftTimeToDate(day, startTime);
				schedule.push(date);
			}
		});
	});
	return schedule;
};

// compute
export const computeScheduleToAvailability = (arr: Date[], hourlyChunks: number): SW.IAvailability => {
	let availabilityObject = constructAvailabilityObject();

	const chunk = getHourlyChunk(hourlyChunks);
	const getStartTime = (date: Date): number => date.getHours() * chunk;
	const getEndTime = (date: Date): number => (date.getHours() + 1) * chunk;
	const getDayOfWeek = (date: Date): SW.DayOfWeekString => getDayOfWeekString(date.getDay() === 0 ? 7 : date.getDay());

	// merges shiftTimes that can be merged ex. input: [{start: 0, end: 60}, {start: 60, end: 120}] , output: [{start: 0, end: 120}]
	const mergeShiftTimesRecursively = (list: SW.IShiftTimes[], prevLength: number) => {
		let originalLength = list.length;
		if (originalLength === prevLength) return list;

		dance: for (let i = 0; i < list.length; i++) {
			for (let j = 0; j < list.length; j++) {
				if (i == j) continue;
				if (list[i].endTime === list[j].startTime) {
					list[i].endTime = list[j].endTime;
					list.splice(j, 1);
					break dance;
				}
			}
		}
		mergeShiftTimesRecursively(list, originalLength);
	};
	// convert raw scheduler data to more useful data
	arr.forEach((date) => availabilityObject[getDayOfWeek(date)].push({ startTime: getStartTime(date), endTime: getEndTime(date) }));
	Object.values(availabilityObject).map((values) => mergeShiftTimesRecursively(values, 0));
	return availabilityObject;
};

export const constructAvailabilityObject = (shifts?: SW.IShift[]): SW.IAvailability => {
	let availabilityObject: SW.IAvailability = {
		MONDAY: [],
		TUESDAY: [],
		WEDNESDAY: [],
		THURSDAY: [],
		FRIDAY: [],
		SATURDAY: [],
		SUNDAY: [],
	};

	if (!shifts) return availabilityObject;

	shifts.forEach(({ dayOfWeek, shiftTimes }) => {
		availabilityObject[getDayOfWeekString(dayOfWeek)].push(shiftTimes);
	});

	return availabilityObject;
};
