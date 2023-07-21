import { Form, Formik, FormikValues } from 'formik';
import { PropsWithChildren } from 'react';
import { DialogCancelButton } from '../../Buttons/DialogCancelButton';
import { SaveChangesButton } from '../../Buttons/SaveChangesButton';

type Props = {
	initialValues?: FormikValues;
	onSubmit?: (args: FormikValues) => void;
	validationSchema?: any | (() => any);
	formDisabled?: boolean;
};

export const DialogFormLayout = ({
	initialValues = {},
	onSubmit = () => {},
	validationSchema = {},
	formDisabled = false,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ values, setFieldValue }) => (
				<Form noValidate>
					<fieldset className='group' disabled={formDisabled}>
						{children}
						<div className='flex w-full justify-end gap-3'>
							<DialogCancelButton />
							<SaveChangesButton />
						</div>
					</fieldset>
				</Form>
			)}
		</Formik>
	);
};
