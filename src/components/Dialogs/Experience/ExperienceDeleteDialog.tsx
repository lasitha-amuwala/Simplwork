import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCandidate } from '@utils/simplwork';
import { DeleteDialog } from '../DeleteDialog';

export const ExperienceDeleteDialog = ({ id }: { id: number }) => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => alert('There was an issue deleting your work experience, please try again later.'),
	});

	const onDelete = async () => await mutateAsync([{ op: 'remove', path: `/candidateProfile/workHistory/${id}` }]);

	return <DeleteDialog onDelete={onDelete} isLoading={isLoading} isSuccess={isSuccess} />;
};
