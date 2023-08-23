import { useState } from 'react';
import { AddExperienceForm } from './AddExperienceForm';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';

export const AddExperienceDialog = () => {
	const [open, setOpen] = useState(false);

	const TriggerButton = () => (
		<div className='flex gap-2 items-center'>
			<p className='tracking-wide'>Add Experience</p>
		</div>
	);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<TriggerButton />}
			title='Add Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<AddExperienceForm afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
