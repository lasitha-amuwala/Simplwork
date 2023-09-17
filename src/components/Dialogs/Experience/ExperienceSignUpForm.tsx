import { useRouter } from 'next/router';
import { queries } from '@utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@components/Auth/AuthProvider';
import { ExperienceAddForm } from './ExperienceAddForm';
import { AddExperienceDialog } from './ExperienceAddDialog';
import { ExperienceList } from '@components/Lists/Experience/ExperienceList';

type Props = {};

export const ExperienceSignUpForm = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();

	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));

	if (isError) router.push('/');
	if (isLoading) return <div>Loading...</div>;
	if (candidate?.workHistory.length == 0) {
		return <ExperienceAddForm />;
	}
	return (
		<div className='flex flex-col gap-5'>
			<div className='max-h-[400px] overflow-y-auto pr-1'>
				<ExperienceList history={candidate?.workHistory ?? []} renderButtons />
			</div>
			<div className='self-end'>
				<AddExperienceDialog triggerLabel='Add Experience' />
			</div>
		</div>
	);
};
