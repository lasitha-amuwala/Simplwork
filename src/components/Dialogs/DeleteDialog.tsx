import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { DialogContentLayout } from '@components/Dialogs/DialogContentLayout';
import { DialogCancelButton } from './DialogCancelButton';
import { CgSpinner } from 'react-icons/cg';

type DeleteDialogProps = { onDelete: () => void; isLoading: boolean; isSuccess: boolean };
export const DeleteDialog = ({ onDelete, isLoading, isSuccess }: DeleteDialogProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isSuccess) setOpen(false);
	}, [isSuccess]);

	return (
		<DialogContentLayout
			open={open}
			setOpen={setOpen}
			triggerLabel={<MdDelete />}
			triggerClassName='p-2 baby-red-btn rounded-full'
			title='Are You Sure?'
			description={`This cannot be undone.`}>
			<div className='flex gap-5 justify-center p-5 pb-0'>
				<DialogCancelButton />
				<button
					onClick={onDelete}
					disabled={isLoading}
					type='submit'
					className='group inline-flex justify-center items-center baby-red-btn px-4 py-2 font-medium group-disabled:pointer-events-none rounded'>
					<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
					<span className='group-disabled:opacity-0'>Delete</span>
				</button>
			</div>
		</DialogContentLayout>
	);
};
