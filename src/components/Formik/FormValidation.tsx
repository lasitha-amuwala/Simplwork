import dayjs from 'dayjs';
import { boolean, number, object, string, date } from 'yup';
import { formatDate } from '../../utils/helpers';

export const profileValidationSchema = object().shape({
	fullName: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name is required'),
	age: number().min(14, 'You must be at least 14 years').max(60, 'You must be at most 60 years').required('Age is required'),
	gender: string().required('Gender is required'),
	phoneNumber: string()
		.matches(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/, 'Invalid format ex. 123-456-7890')
		.required('A phone number is required'),
});

export const validationSchemaStepTwo = object().shape({
	maximumHours: number().min(0, 'Please enter a valid hour').max(168, 'Please enter a valid hour').required('You must enter this field.'),
});

const transformFormatDate = (value: string, originalValue: string) =>
	dayjs(originalValue, 'DD-MM-YYYY').isValid() ? originalValue : formatDate(originalValue);

export const workHistoryValidationSchema = object().shape({
	positionTitle: string().required('Position title is required.'),
	companyName: string().required('Compnay name is required.'),
	details: string().required('Position details is required.'),
	startDate: date().required('Start date is required.').max(new Date(), 'Please choose past date'),
	endDate: date()
		.required('End date is required.')
		.max(new Date(), 'Please choose past date')
		.when('startDate', (startDate, schema) => startDate && schema.min(startDate, 'End date cannot be before start date')),
	currWorking: boolean(),
});

export const employerProfile = object().shape({
	companyName: string().required('Company name is required.').min(2, 'Too Short!').max(500, 'Too Long'),
	companyDescription: string()
		.required('Compnay description is required.')
		.min(2, 'Too Short!')
		.max(2000, 'Maximum 2000 characters, Too Long!'),
});

export const jobPostingValidationSchema = object().shape({
	positionTitle: string().required('Position title is required.'),
	pay: number().required('Pay is required.'),
	fixedSchedule: boolean().required('This field is required.'),
	jobDescription: string().required('Job Description is required.'),
	benefits: string().required('Benefits is required.'),
});
