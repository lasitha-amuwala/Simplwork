import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { EditPostingForm } from '@components/Dialogs/EditPostingForm';

export const PostingEditDialog = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={'Edit Posting'}
			triggerClassName='button'
			title='Edit Posting'
			description={`Add work history here. Click add when you're done.`}>
			<EditPostingForm />
		</DialogContentLayout>
	);
};
