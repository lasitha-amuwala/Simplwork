import { Field, FieldArray, Form, FormikValues } from 'formik';
import React from 'react';

type Props = { values: FormikValues };

export const WorkExperience = ({ values }: Props) => {
	const convertDate = (date: string) => {
		const dateString = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' });
		return dateString;
	};
	return (
		<div>
			<div className='flex flex-col gap-3'>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Job Title
					</label>
					<Field name={`workHistory.${0}.positionTitle`} as='input' type='text' id='jobTitle' className='inputStyle' />
				</div>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Company
					</label>
					<Field name={`workHistory.${0}.companyName`} as='input' type='text' id='jobTitle' className='inputStyle' />
				</div>
				<div className='flex gap-5'>
					<div>
						<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
							Start Date
						</label>
						<Field name={`workHistory.${0}.startDate`} as='input' type='date' id='jobTitle' className='inputStyle' />
					</div>
					<div>
						<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
							End Date
						</label>
						<Field name={`workHistory.${0}.endDate`} as='input' type='date' id='jobTitle' className='inputStyle' />
					</div>
				</div>
				<div>
					<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
						Job Description
					</label>
					<Field name={`workHistory.${0}.details`} as='textarea' type='text' id='jobTitle' className='inputStyle h-32 py-2' />
				</div>
			</div>
			<div className='flex'>{/* <button onClick={() => arrayHelpers.push(0)}>Save</button> */}</div>
		</div>
		// <FieldArray
		// 	name='workHistory'
		// 	render={(arrayHelpers) => (
		// 		<div>
		// 			{values.workHistory && (
		// 				<div>
		// 					<div className='max-h-60 overflow-y-scroll'>
		// 						{values.workHistory.map((history: any, index: number) => (
		// 							<div key={index} className='p-5 bg-slate-100 rounded mt-5'>
		// 								<p className='flex gap-2'>
		// 									<span className='font-semibold'>{history.positionTitle}</span>•<span className='font-normal'>{history.companyName}</span>
		// 								</p>
		// 								<p className='flex gap-1 font-noraml text-slate-500'>
		// 									<span>{convertDate(history.startDate)}</span>-<span>{convertDate(history.endDate)}</span>
		// 								</p>
		// 								<p className='pt-3'>
		// 									<span className='font-normal'>{history.details}</span>
		// 								</p>
		// 							</div>
		// 						))}
		// 					</div>
		// 					<div>
		// 						<div className='flex flex-col gap-3'>
		// 							<div>
		// 								<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
		// 									Job Title
		// 								</label>
		// 								<Field name={`workHistory.${0}.positionTitle`} as='input' type='text' id='jobTitle' className='inputStyle' />
		// 							</div>
		// 							<div>
		// 								<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
		// 									Company
		// 								</label>
		// 								<Field name={`workHistory.${0}.companyName`} as='input' type='text' id='jobTitle' className='inputStyle' />
		// 							</div>
		// 							<div className='flex gap-5'>
		// 								<div>
		// 									<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
		// 										Start Date
		// 									</label>
		// 									<Field name={`workHistory.${0}.startDate`} as='input' type='date' id='jobTitle' className='inputStyle' />
		// 								</div>
		// 								<div>
		// 									<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
		// 										End Date
		// 									</label>
		// 									<Field name={`workHistory.${0}.endDate`} as='input' type='date' id='jobTitle' className='inputStyle' />
		// 								</div>
		// 							</div>
		// 							<div>
		// 								<label className='font-medium leading-[35px]' htmlFor='jobTitle'>
		// 									Job Description
		// 								</label>
		// 								<Field name={`workHistory.${0}.details`} as='textarea' type='text' id='jobTitle' className='inputStyle h-32 py-2' />
		// 							</div>
		// 						</div>
		// 						<div className='flex'>
		// 							<button onClick={() => arrayHelpers.push(0)}>Save</button>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			)}
		// 		</div>
		// 	)}></FieldArray>
	);
};
