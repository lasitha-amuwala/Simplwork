import { useAuth } from '@components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { useRouter } from 'next/router';
import { BranchList } from '../../../Lists/Branches/BranchList';
import { CreateBranchForm } from './CreateBranchForm';

type SignUpBranchProps = { employerName: string };
type Values = { branchName: string };

export const SignUpBranchForm = ({ employerName }: SignUpBranchProps) => {
	const { user } = useAuth();
	const router = useRouter();

	const branchQuery = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));
	const { data: branches, isError, isLoading } = branchQuery;

	if (isError) router.push('/');
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='flex flex-col gap-5'>
			<BranchList branches={branches ?? []} />
			<CreateBranchForm employerName={employerName} afterSave={()=> {}}/>
		</div>
	);
};
