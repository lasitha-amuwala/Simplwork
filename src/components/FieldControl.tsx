import { Field } from 'formik';
import { CustomErrorMessage } from './CustomErrorMessage';

type FieldControlProps = {
	name: string;
	label: string;
	type: string;
	errorBelow?: boolean;
	[key: string]: any;
};

export const FieldControl = ({ name, label, type, errorBelow, children, ...props }: React.PropsWithChildren<FieldControlProps>) => {
	return (
		<div className='w-full h-full'>
			<div className='w-full flex items-baseline justify-between'>
				<label className='font-medium leading-[35px] flex-shrink-0 mr-5' htmlFor={name}>
					{label}
				</label>
				{!errorBelow && <CustomErrorMessage name={name} />}
			</div>
			<Field type={type} name={name} required className='inputStyle' {...props}>
				{children}
			</Field>
			{errorBelow && <CustomErrorMessage name={name} />}
		</div>
	);
};
