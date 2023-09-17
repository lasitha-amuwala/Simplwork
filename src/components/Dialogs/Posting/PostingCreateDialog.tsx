import React, { useState } from 'react';
import { DialogContentLayout } from '../DialogContentLayout';
import { HiOutlinePlus } from 'react-icons/hi';
import { PostingCreateForm } from './PostingCreateForm';

type Props = {};

export const PostingCreateDialog = (props: Props) => {
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
			<div className='w-[550px]'>
				<PostingCreateForm afterSave={() => setOpen(false)} />
			</div>
		</DialogContentLayout>
	);
};
