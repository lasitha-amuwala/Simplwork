import { useState } from 'react';
import { AddExperienceForm } from './AddExperienceForm';
import { DialogContentLayout, DialogContentLayoutProps } from '@components/Dialogs/DialogContentLayout';

export const AddExperienceDialog = ({
	triggerLabel,
	triggerClassName,
}: Partial<Pick<DialogContentLayoutProps, 'triggerLabel' | 'triggerClassName'>>) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={triggerLabel}
			triggerClassName={triggerClassName}
			title='Add Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<AddExperienceForm afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
