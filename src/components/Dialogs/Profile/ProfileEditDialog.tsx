import { PropsWithChildren, useState } from 'react';
import { ProfileEditForm } from './ProfileEditForm';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { MdEdit } from 'react-icons/md';

type ProfileEditDialogProps = { profileData: any };

export const ProfileEditDialog = ({ profileData }: PropsWithChildren<ProfileEditDialogProps>) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdEdit />}
			triggerClassName='light-blue-round-btn'
			title='Edit Profile'
			description={`Make changes to your profile here. Click save when you're done.`}>
			<ProfileEditForm profileData={profileData} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
