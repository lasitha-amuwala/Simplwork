import { PropsWithChildren, useState } from 'react';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { MdEdit } from 'react-icons/md';
import { EmployerProfileEditForm } from './EmployerProfileEditForm';

type EmployerProfileEditDialogProps = { employerData: SW.Employer.IEmployer };

export const EmployerProfileEditDialog = ({ employerData }: PropsWithChildren<EmployerProfileEditDialogProps>) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdEdit />}
			triggerClassName='light-blue-round-btn'
			title='Edit Profile'
			description={`Make changes to your profile here. Click save when you're done.`}>
			<EmployerProfileEditForm employerData={employerData} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
