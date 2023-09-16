import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { BranchEditForm } from './BranchEditForm';

export const EditBranchDialog = ({ employerName, branch }: { branch: SW.Employer.IBranch; employerName: string }) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdEdit />}
			triggerClassName='light-blue-round-btn'
			title='Edit Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<BranchEditForm employerName={employerName} afterSave={() => setOpen(false)} branch={branch} />
		</DialogContentLayout>
	);
};
