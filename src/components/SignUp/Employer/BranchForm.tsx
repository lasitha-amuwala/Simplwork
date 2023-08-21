import { AutoComplete } from '@components/AutoComplete';
import { FieldControl } from '@components/Formik/Feilds/FieldControl';
import React from 'react';

type BranchFormProps = { updateLocation: (arg: SW.ILocation) => void; afterSave: () => void };

export const BranchForm = ({ updateLocation }: BranchFormProps) => {
	return (
		<div className='flex flex-col gap-3'>
			<FieldControl name='branchName' label='Branch Name' type='text' />
			<AutoComplete update={updateLocation} />
		</div>
	);
};
