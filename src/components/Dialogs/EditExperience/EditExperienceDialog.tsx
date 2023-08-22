import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { WorkHistory } from '@components/Lists/Experience/ExperienceList';
import { WorkExperienceForm } from './EditExperienceForm';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';

export const EditExperienceDialog = ({ index, data }: { index: number; data: WorkHistory }) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdEdit />}
			triggerClassName='p-2 rounded baby-blue-btn'
			title='Edit Work Experience'
			description={`Add work history here. Click add when you're done.`}>
			<WorkExperienceForm index={index} data={data} afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
