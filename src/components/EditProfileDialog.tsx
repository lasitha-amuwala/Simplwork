import { queries } from '../utils/simplwork';
import { useAuth } from './Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ProfileForm } from './ProfileForm';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './Dialog';

export const EditProfileDialog = () => {
	const { user } = useAuth();
	const { data } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className='button'>Edit Profile</button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				<ProfileForm profileData={data} afterSave={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
