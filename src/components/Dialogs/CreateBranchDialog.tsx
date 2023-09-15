import React, { useState } from 'react';
import { DialogContentLayout } from './DialogContentLayout';
import { CreateBranchForm } from '@components/Formik/Forms/Signup/CreateBranchForm';

type Props = {
	employerName: string;
};

export const CreateBranchDialog = ({ employerName }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			title='Create Branch'
			description='Add a branch to your company profile'
			triggerLabel='Create Branch'>
			<CreateBranchForm employerName={employerName} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
