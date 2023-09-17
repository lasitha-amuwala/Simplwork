import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DeleteButton } from '@components/Buttons/DeleteButton';
import { DialogCancelButton } from '../DialogCancelButton';
import { BaseDialogContent } from '../DialogContentLayout';
import { DialogClose } from '../Dialog';

export const DeletePostingDialog = ({ id }: { id: number }) => {
	const queryClient = useQueryClient();

	const deletePost = (id: number) => SimplworkApi.delete(`employer/postings/${id}`);

	const { mutate, isLoading } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => alert('There was an issue deleting your postings, please try again later.'),
	});

	const handleDelete = () => mutate(id);

	return (
		<BaseDialogContent
			title='Are you absolutely sure?'
			description='This action cannot be undone. This will permanently delete your posting.'>
			<div className='w-full inline-flex gap-3 justify-end'>
				<DialogCancelButton />
				<DialogClose asChild>
					<DeleteButton text='Yes, delete posting' disabled={isLoading} onClick={handleDelete} />
				</DialogClose>
			</div>
		</BaseDialogContent>
	);
};
