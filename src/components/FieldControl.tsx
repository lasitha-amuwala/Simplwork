import { ErrorMessage, Field } from 'formik';

type FieldControlProps = {
	name: string;
	label: string;
	type: string;
	errorBelow?: boolean;
	[key: string]: any;
};

export const FieldControl = ({ name, label, type, errorBelow, children, ...props }: React.PropsWithChildren<FieldControlProps>) => {
	const errorMsgStyle = 'text-sm font-medium text-red-700 py-1';

	return (
		<div className='w-full h-full'>
			<div className='w-full flex items-baseline justify-between'>
				<label className='font-medium leading-[35px] flex-shrink-0 mr-5' htmlFor={name}>
					{label}
				</label>
				{!errorBelow && <ErrorMessage name={name} render={(msg: string) => <p className={errorMsgStyle}>{msg}</p>} />}
			</div>
			<Field type={type} name={name} required className='inputStyle' {...props}>
				{children}
			</Field>
			{errorBelow && <ErrorMessage name={name} render={(msg: string) => <p className={errorMsgStyle}>{msg}</p>} />}
		</div>
	);
};
