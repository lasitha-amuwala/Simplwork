import { PropsWithChildren, useState } from 'react';
import { EditProfileForm } from './EditProfileForm';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { MdEdit } from 'react-icons/md';

type EditProfileDialogProps = { profileData: any };

export const EditProfileDialog = ({ profileData }: PropsWithChildren<EditProfileDialogProps>) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdEdit />}
			triggerClassName='ligth-blue-round-btn'
			title='Edit Profile'
			description={`Make changes to your profile here. Click save when you're done.`}>
			<EditProfileForm profileData={profileData} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
