import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DeleteDialog } from './DeleteDialog';

export const DeletePostingDialog = ({ id }: { id: number }) => {
	const queryClient = useQueryClient();

	const deletePost = (id: number) => SimplworkApi.delete(`employer/postings/${id}`);

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => alert('There was an issue deleting your postings, please try again later.'),
	});

	return <DeleteDialog onDelete={() => mutate(id)} isLoading={isLoading} isSuccess={isSuccess} />;
};
