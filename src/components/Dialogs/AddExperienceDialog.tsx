import { useState } from 'react';
import { DialogTemplate } from './DialogTemplate';
import { AddExperienceForm } from './Forms/AddExperienceForm';

export const AddExperienceDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<DialogTemplate
			open={open}
			setOpen={setOpen}
			triggerLabel='Add Experience'
			title='Add Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<AddExperienceForm afterSave={() => setOpen(false)} />
		</DialogTemplate>
	);
};
