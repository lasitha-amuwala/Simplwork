import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { WorkHistory } from '@components/Lists/Experience/ExperienceList';
import { DeleteFormButtons } from './DeleteFormButtons';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';

export const DeleteExperienceDialog = ({ index, data }: { index: number; data: WorkHistory }) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdDelete />}
			triggerClassName='p-2 rounded baby-red-btn'
			title='Are You Sure?'
			description={`This cannot be undone.`}>
			<DeleteFormButtons afterDelete={() => setOpen(false)} index={index} />
		</DialogContentLayout>
	);
};
