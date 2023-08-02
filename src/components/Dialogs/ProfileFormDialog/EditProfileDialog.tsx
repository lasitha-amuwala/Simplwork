import { PropsWithChildren, useState } from 'react';
import { DialogContentLayout } from '../DialogContentLayout';
import { EditProfileForm } from './EditProfileForm';

type EditProfileDialogProps = { profileData: any };

export const EditProfileDialog = ({ profileData }: PropsWithChildren<EditProfileDialogProps>) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel='Edit Profile'
			title='Edit Profile'
			description={`Make changes to your profile here. Click save when you're done.`}>
			<EditProfileForm profileData={profileData} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
