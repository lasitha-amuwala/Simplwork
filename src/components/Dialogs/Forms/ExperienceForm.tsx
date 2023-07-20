import { Form, Formik, FormikValues } from 'formik';
import { FieldControl } from '../../FieldControl';
import { CgSpinner } from 'react-icons/cg';
import { DialogClose } from '../Dialog';
import { workHistoryValidationSchema } from '../../SignUp/SignUpFlow';

type Props = {
	initialValues: FormikValues;
	onSubmit: (args: FormikValues) => void;
	disabled: boolean;
};

export const ExperienceForm = ({ initialValues, onSubmit, disabled }: Props) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema}>
			{({ values, setFieldValue }) => (
				<Form noValidate>
					<fieldset disabled={disabled} className='group'>
						<div className='flex flex-col gap-2 my-5'>
							<FieldControl name='positionTitle' label='Position Title' type='text' />
							<FieldControl name='companyName' label='Compnay Name' type='text' />
							<div className='flex gap-5'>
								<FieldControl name='startDate' label='Start Date' type='date' />
								<FieldControl name='endDate' label='End Date' type='date' />
							</div>
							<FieldControl name='details' label='Job Description' as='textarea' type='text' />
						</div>
						<div className='flex w-full justify-end gap-3'>
							<DialogClose aria-label='Close' asChild>
								<button type='button' className='button' aria-label='Close'>
									Cancel
								</button>
							</DialogClose>
							<button
								type='submit'
								className='inline-flex justify-center items-center bg-green-100 py-2 px-3 rounded text-green-700 font-medium hover:bg-green-200 group-disabled:pointer-events-none'>
								<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
								<span className='group-disabled:opacity-0'>Save Changes</span>
							</button>
						</div>
					</fieldset>
				</Form>
			)}
		</Formik>
	);
};
