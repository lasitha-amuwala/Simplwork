import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(isoWeek);

// https://stackoverflow.com/questions/33076177/getting-name-initials-using-js
export const getInitials = (fullName: string) => {
	const allNames = fullName.trim().split(' ');
	const initials = allNames.reduce((acc, curr, index) => {
		if (index === 0 || index === allNames.length - 1) {
			acc = `${acc}${curr.charAt(0).toUpperCase()}`;
		}
		return acc;
	}, '');
	return initials;
};

export const formatDate = (date: string): string => {
	return dayjs(date, 'DD-MM-YYYY', true).isValid() ? date : dayjs(date).format('DD-MM-YYYY');
};

export const timeFromNow = (date: Date) => {
	if (!date) return;
	return `${dayjs(date).format('MMM D YYYY')} - ${dayjs().to(date)}`;
};

export const unEscape = (htmlStr: string) => {
	htmlStr = htmlStr.replace(/&lt;/g, '<');
	htmlStr = htmlStr.replace(/&gt;/g, '>');
	htmlStr = htmlStr.replace(/&quot;/g, '"');
	htmlStr = htmlStr.replace(/&#39;/g, "'");
	htmlStr = htmlStr.replace(/&amp;/g, '&');
	return htmlStr;
};

export const getWeekDay = (day: number) => dayjs().isoWeekday(day);
