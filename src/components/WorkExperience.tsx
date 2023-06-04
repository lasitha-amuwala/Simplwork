import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FieldControl } from './FieldControl';

type Props = {};

export const WorkExperience = (props: Props) => {
	return (
		<Form>
			<div className='flex flex-col gap-3'>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Job Title
					</label>
					<input type='text' id='jobTitle' className='inputStyle'></input>
				</div>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Company
					</label>
					<input type='text' id='jobTitle' className='inputStyle'></input>
				</div>
				<div className='flex gap-5'>
					<div>
						<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
							Start Date
						</label>
						<input type='date' id='jobTitle' className='inputStyle'></input>
					</div>
					<div>
						<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
							End Date
						</label>
						<input type='date' id='jobTitle' className='inputStyle'></input>
					</div>
				</div>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Job Description
					</label>
					<textarea id='jobTitle' className='inputStyle h-32 py-2'></textarea>
				</div>
			</div>
		</Form>
	);
};
