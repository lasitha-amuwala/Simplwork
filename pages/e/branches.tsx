import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { BranchCreateDialog } from '@components/Dialogs/Branch/BranchCreateDialog';
import { ErrorTryAgain } from '@components/ErrorTryAgain';
import { BranchList } from '@components/Lists/Branches/BranchList';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { NextPage } from 'next';
import Head from 'next/head';

type Props = {};

const Branches: NextPage = (props: Props) => {
	const { user, employerName } = useAuth();

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName as string, { pageSize: '20', pageNo: '0' }));

	if (!employerName) return <ErrorTryAgain />;
	return (
		<>
			<Head>
				<title>Branches - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<div className='flex flex-col justify-center items-center'>
					<div className='max-w-2xl w-full pt-10 gap-5 flex flex-col'>
						<div className='self-end'>
							<BranchCreateDialog employerName={employerName} />
						</div>
						<BranchList branches={branches ?? []} employerName={employerName} />
					</div>
				</div>
			</ProtectedPage>
		</>
	);
};

export default Branches;
