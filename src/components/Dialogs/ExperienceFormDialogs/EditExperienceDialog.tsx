import { useState } from 'react';
import { WorkHistory } from '../../ExperienceList';
import { DialogContentLayout } from '../DialogContentLayout';
import { WorkExperienceForm } from './EditExperienceForm';
import { MdEdit } from 'react-icons/md';

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
