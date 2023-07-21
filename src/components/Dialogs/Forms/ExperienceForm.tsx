import { FieldControl } from '../../FieldControl';

export const ExperienceForm = () => {
	return (
		<fieldset>
			<div className='flex flex-col gap-2 my-5'>
				<FieldControl name='positionTitle' label='Position Title' type='text' />
				<FieldControl name='companyName' label='Compnay Name' type='text' />
				<div className='flex gap-5'>
					<FieldControl name='startDate' label='Start Date' type='date' />
					<FieldControl name='endDate' label='End Date' type='date' />
				</div>
				<FieldControl name='details' label='Job Description' as='textarea' type='text' className='py-2 w-full inputStyle h-32' />
			</div>
		</fieldset>
	);
};
