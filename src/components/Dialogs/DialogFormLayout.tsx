import { Form, Formik, FormikValues } from 'formik';
import { PropsWithChildren } from 'react';
import { DialogCancelButton } from './DialogCancelButton';
import { SaveChangesButton } from '../Buttons/SaveChangesButton';
import { FormikBaseLayout } from '../Formik/FormikBaseLayout';
import { WorkHistoryValuesType } from './ExperienceFormDialogs/EditExperienceForm';

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
		<FormikBaseLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			<fieldset className='group' disabled={formDisabled}>
				{children}
				<div className='flex w-full justify-end gap-3'>
					<DialogCancelButton />
					<SaveChangesButton />
				</div>
			</fieldset>
		</FormikBaseLayout>
	);
};
