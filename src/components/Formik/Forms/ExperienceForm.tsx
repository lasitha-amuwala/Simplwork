import { FieldControl } from '../inputs/FieldControl';
import { DayPicker } from '../inputs/DayPicker';
import { useField } from 'formik';

export const ExperienceForm = () => {
	const [field] = useField('currWorking');
	return (
		<fieldset>
			<div className='flex flex-col gap-2 my-5'>
				<FieldControl name='positionTitle' label='Position Title' type='text' />
				<FieldControl name='companyName' label='Compnay Name' type='text' />
				<div className='flex gap-2'>
					{/* <Field type='checkbox' name='currWorking' id='currWorking' /> */}
					<label htmlFor='currWorking'>{`I am currently working in this role.`}</label>
				</div>
				<div className='flex gap-5'>
					<DayPicker name='startDate' label='Start Date' type='date' errorBelow />
					<DayPicker name='endDate' label='End Date' type='date' errorBelow disabled={field.value} />
				</div>
				<FieldControl name='details' label='Job Description' as='textarea' type='text' className='py-2 w-full inputStyle h-32' />
			</div>
		</fieldset>
	);
};
