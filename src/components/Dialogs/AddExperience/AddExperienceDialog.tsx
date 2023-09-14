import { useState } from 'react';
import { AddExperienceForm } from './AddExperienceForm';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { CgMathPlus } from 'react-icons/cg';

export const AddExperienceDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<CgMathPlus />}
			triggerClassName='ligth-blue-round-btn'
			title='Add Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<AddExperienceForm afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
