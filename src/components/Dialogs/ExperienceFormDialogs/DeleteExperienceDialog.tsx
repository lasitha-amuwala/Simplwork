import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';
import { WorkHistory } from '../../ExperienceList';
import { DialogContentLayout } from '../DialogContentLayout';
import { patchCandidate } from '@/src/utils/simplwork';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogCancelButton } from '../DialogCancelButton';

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

const DeleteFormButtons = ({ index, afterDelete }: { index: number; afterDelete: () => void }) => {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue deleting your work experience, please try again later.');
			afterDelete();
		},
	});

	const onDelete = async () => {
		setDeleting(true);
		const data = [{ op: 'remove', path: `/candidateProfile/workHistory/${index}` }];
		await mutateAsync(data);
		afterDelete();
	};

	return (
		<div className='flex gap-5 justify-center p-5 pb-0'>
			<DialogCancelButton />
			<button
				onClick={onDelete}
				disabled={deleting}
				type='submit'
				className='group inline-flex justify-center items-center baby-red-btn px-4 py-2 font-medium group-disabled:pointer-events-none'>
				<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
				<span className='group-disabled:opacity-0'>Delete</span>
			</button>
		</div>
	);
};
