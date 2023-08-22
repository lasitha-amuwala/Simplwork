import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { patchCandidate } from '@utils/simplwork';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogCancelButton } from '@components/Dialogs/DialogCancelButton';

export const DeleteFormButtons = ({ index, afterDelete }: { index: number; afterDelete: () => void }) => {
	const queryClient = useQueryClient();
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
