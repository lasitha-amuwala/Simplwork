import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DeleteDialog } from './DeleteDialog';

export const BranchDeleteDialog = ({ branchName, employerName }: { branchName: string; employerName: string }) => {
	const queryClient = useQueryClient();

	const deletePost = () => SimplworkApi.delete(`employer/${employerName}/branch?branchName=${branchName}&force=true`);

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => alert('There was an issue deleting your branch, please try again later.'),
	});

	return <DeleteDialog onDelete={() => mutate()} isLoading={isLoading} isSuccess={isSuccess} />;
};
