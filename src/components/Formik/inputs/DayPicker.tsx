import dayjs from 'dayjs';
import { useField } from 'formik';
import { FieldControl, FieldControlProps } from './FieldControl';

export const DayPicker = ({ name, ...rest }: FieldControlProps) => {
	const [field] = useField(name);
	const value = field.value == undefined ? field.value : dayjs(field.value).format('YYYY-MM-DD')
	return <FieldControl name={name} value={value} {...rest} />;
};
