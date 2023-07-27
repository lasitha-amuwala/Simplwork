import dayjs from "dayjs";

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

export const formatDate = (date: string): string => dayjs(date).format('DD-MM-YYYY');
