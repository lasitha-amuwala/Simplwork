import React, { Dispatch, SetStateAction } from 'react';
import { FieldControl } from '../inputs/FieldControl';
import { Field, useFormikContext } from 'formik';
import { AvailabilityEditDialog } from '@components/AvailabilityWidget/AvailabilityEditDialog';
import { Tooltip } from '@components/Tooltip';
import { LuInfo } from 'react-icons/lu';

export type PostingValues = {
	positionTitle: string;
	pay: number;
	fixedSchedule: boolean;
	jobDescription: string;
	estimatedHours: number;
	benefits: string;
	branch: string;
};

type Props = {
	shifts: SW.IShift[];
	setShifts: Dispatch<SetStateAction<SW.IShift[]>>;
	branches: SW.Employer.IBranch[] | undefined;
	branchesDisabled?: boolean;
};

export const PostingForm = ({ branches, shifts, setShifts, branchesDisabled }: Props) => {
	const { values } = useFormikContext<PostingValues>();

	const onSave = (shifts: SW.IShift[]) => setShifts(shifts);
	return (
		<div className='flex flex-col gap-1 pb-5 w-full'>
			<FieldControl name='positionTitle' type='text' label='Position Title' />
			<FieldControl name='branch' type='text' label='Branch' as='select' disabled={branchesDisabled}>
				<option value='' disabled hidden>
					Choose branch here
				</option>
				{branches?.map((branch) => (
					<option key={branch.branchName} value={branch.branchName} className='flex flex-col'>
						<span className='font-medium'>{`${branch.branchName} - ${branch.location.fullAddress}`}</span>
					</option>
				))}
			</FieldControl>
			<FieldControl name='pay' type='number' label='Hourly Pay' min='0' />
			<div className='flex gap-2 pt-5'>
				<div className=''>
					<h1 className='font-semibold inline-block pr-1'>Is the shift schedule fixed?</h1>
					<div className='inline-block align-middle'>
						<Tooltip
							content={
								<p>
									<span className='font-medium'>What is a fixed schedule? </span>A shift schedule where the employee works the same time everyday,
									everyweek
								</p>
							}
							trigger={<LuInfo className='text-gray-800 align-middle' />}
						/>
					</div>
				</div>
				<Field name='fixedSchedule' type='checkbox' />
			</div>
			<h1 className='font-semibold'>
				{values.fixedSchedule ? 'Create weekly shift schedule:' : 'Enter all the possible shifts for the job posting:'}
			</h1>
			<div className='py-5 w-full'>
				<AvailabilityEditDialog shifts={shifts} onSave={onSave} isLoading={false} />
			</div>
			{!values.fixedSchedule && (
				<label className='flex gap-3 items-center'>
					<h1 className='font-semibold'>Approximatly how many hours per week does this position require:</h1>
					<Field name='estimatedHours' type='number' className='inputStyle w-20' min='0' max='168' />
				</label>
			)}
			<FieldControl name='jobDescription' type='text' label='Job Description' as='textarea' className='h-24 inputStyle' />
			<FieldControl name='benefits' type='text' label='Benefits' as='textarea' className='h-24 inputStyle' />
		</div>
	);
};
