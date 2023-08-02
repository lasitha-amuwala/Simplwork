import { Field, FieldAttributes, FormikValues } from 'formik';
import { CustomErrorMessage } from '../../CustomErrorMessage';

export type FieldControlProps = {
	label: string;
	errorBelow?: boolean;
	[key: string]: any;
} & FieldAttributes<FormikValues>;

export const FieldControl = ({ name, type, label, errorBelow, children, ...props }: React.PropsWithChildren<FieldControlProps>) => {
	return (
		<div className='w-full h-full'>
			<div className='w-full flex items-baseline justify-between'>
				<label className='font-medium leading-[35px] flex-shrink-0 mr-5' htmlFor={name}>
					{label}
				</label>
				{!errorBelow && <CustomErrorMessage name={name} />}
			</div>
			<Field name={name} type={type} className='inputStyle' {...props}>
				{children}
			</Field>
			{errorBelow && <CustomErrorMessage name={name} />}
		</div>
	);
};
