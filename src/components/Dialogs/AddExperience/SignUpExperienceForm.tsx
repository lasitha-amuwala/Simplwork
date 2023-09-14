import { useRouter } from 'next/router';
import { queries } from '@utils/simplwork';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@components/Auth/AuthProvider';
import { AddExperienceForm } from './AddExperienceForm';
import { AddExperienceDialog } from './AddExperienceDialog';
import { ExperienceList } from '@components/Lists/Experience/ExperienceList';

type Props = {};

export const SignUpExperienceForm = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();

	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));

	if (isError) router.push('/');
	if (isLoading) return <div>Loading...</div>;
	if (candidate?.workHistory.length == 0) {
		return <AddExperienceForm />;
	}
	return (
		<div className='flex flex-col gap-5'>
			<div className='max-h-[400px] overflow-y-auto pr-1'>
				<ExperienceList history={candidate?.workHistory ?? []} />
			</div>
			<div className='self-end'>
				<AddExperienceDialog />
			</div>
		</div>
	);
};
