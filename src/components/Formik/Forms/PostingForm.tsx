import React, { Dispatch, SetStateAction } from 'react';
import { FieldControl } from '../inputs/FieldControl';
import { Field } from 'formik';
import { AutoComplete } from '../../AutoComplete';
import { AvailabilityWidget } from '../../AvailabilityWidget';

type Props = {
	updateLocation: (arg: SW.ILocation) => void;
	availability: SW.IAvailability;
	setAvailability: Dispatch<SetStateAction<SW.IAvailability>>;
};

export const PostingForm = ({ updateLocation, availability, setAvailability }: Props) => {
	return (
		<div className='flex flex-col gap-1 py-5'>
			<FieldControl name='positionTitle' type='text' label='Position Title' />
			<AutoComplete update={updateLocation} />
			<FieldControl name='pay' type='number' label='Pay' min='0' />
			<label className='flex gap-2 pt-5'>
				<h1 className='font-semibold'>Are the shifts for this job flexible</h1>
				<Field name='fixedSchedule' type='checkbox' />
			</label>
			<label className='flex gap-3 items-center'>
				<h1 className='font-semibold'>How many hours per week does this position require:</h1>
				<Field name='estimatedHours' type='number' className='inputStyle w-20' min='0' max='168' />
			</label>
			<h1 className='font-semibold'>Create weekly shift schedule:</h1>
			<div className='h-[400px] overflow-auto'>
				<AvailabilityWidget availability={availability} onChange={setAvailability} />
			</div>
			<FieldControl name='jobDescription' type='text' label='Job Description' as='textarea' className='h-32  inputStyle' />
			<FieldControl name='benefits' type='text' label='Benefits' />
		</div>
	);
};
