import React from 'react';
import { DatePicker } from './DatePicker';
import { useField } from 'formik';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

type Props = {};

export const DatePickerField = ({ ...props }) => {
	const [field, meta, helpers] = useField(props.name);
	console.log(field, meta);
	const now = dayjs(field.value, ['DD-MM-YYYY', 'MM-DD-YYYY'], true).toDate();
	console.log(now);
	return (
		<DatePicker
			{...field}
			showIcon
			className='inputStyle'
			selected={now || null}
			onChange={(date) => {
				console.log(date, typeof date);
				helpers.setValue(date);
			}}
		/>
	);
};
