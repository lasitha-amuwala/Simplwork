import React, { useState } from 'react';
import { DialogContentLayout } from '../Dialogs/DialogContentLayout';
import { HiOutlinePlus } from 'react-icons/hi';
import { CreatePostingForm } from './CreatePostingForm';

type Props = {};

export const CreatePostingDialog = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const TriggerButton = () => (
		<div className='flex gap-2 items-center'>
			<HiOutlinePlus className='text-xl' />
			<p className='tracking-wide'>Create Job Posting</p>
		</div>
	);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<TriggerButton />}
			title='Create Job Posting'
			description={`Create and post job posting. Click save when you're done.`}>
			<CreatePostingForm afterSave={() => setOpen(false)} />
		</DialogContentLayout>
	);
};
