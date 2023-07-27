import { useField, useFormikContext } from 'formik';
import { FieldControl } from '../../FieldControl';
import { useState } from 'react';
import { DatePicker } from '../../DatePicker';
import { DatePickerField } from '../../DatePickerField';

export const ExperienceForm = () => {
	const { values } = useFormikContext();

	const [endDateDisabled, setEndDateDisabled] = useState(false);
	const onCheckboxClick = () => setEndDateDisabled(!endDateDisabled);
	// const date = new Date();
	return (
		<fieldset>
			<div className='flex flex-col gap-2 my-5'>
				<FieldControl name='positionTitle' label='Position Title' type='text' />
				<FieldControl name='companyName' label='Compnay Name' type='text' />
				<div className='flex gap-2'>
					<input checked={endDateDisabled} onClick={() => onCheckboxClick()} type='checkbox' name='currWorking' id='currWorking' />
					<label htmlFor='currWorking'>{`I am currently working in this role.`}</label>
				</div>
				<div className='flex gap-5'>
					{/* <DatePickerField name='startDate' /> */}
					{/* <FieldControl name='startDate' label='Start Date' type='date' pattern='\d{2}-\d{2}-\d{4}' /> */}
					<FieldControl name='endDate' label='End Date' type='date' />
				</div>
				<FieldControl name='details' label='Job Description' as='textarea' type='text' className='py-2 w-full inputStyle h-32' />
			</div>
		</fieldset>
	);
};
