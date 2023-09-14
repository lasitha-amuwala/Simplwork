import { FormikValues } from 'formik';
import { PropsWithChildren } from 'react';
import { SaveChangesButton } from '../Buttons/SaveChangesButton';
import { FormikLayout } from '../Formik/FormikBaseLayout';

type Props = {
	initialValues: {};
	onSubmit: (args: FormikValues) => void;
	validationSchema: any | (() => any);
	formDisabled?: boolean;
};

export const DialogFormLayout = ({
	initialValues,
	onSubmit,
	validationSchema,
	formDisabled = false,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<FormikLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			<fieldset className='group' disabled={formDisabled}>
				{children}
				<div className='flex w-full justify-end gap-3'>
					<SaveChangesButton />
				</div>
			</fieldset>
		</FormikLayout>
	);
};
