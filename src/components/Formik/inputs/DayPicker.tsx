import dayjs from 'dayjs';
import { useField } from 'formik';
import { FieldControl, FieldControlProps } from './FieldControl';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const DayPicker = ({ name, ...rest }: FieldControlProps) => {
	const [field] = useField(name);
	const value = field.value == undefined ? field.value : dayjs(field.value, ['DD-MM-YYYY', 'YYYY-MM-DD'], true).format('YYYY-MM-DD');

	return <FieldControl name={name} value={value} {...rest} />;
};
