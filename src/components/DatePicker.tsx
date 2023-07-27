import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = (props: ReactDatePickerProps) => {
	return <ReactDatePicker {...props} />;
};
