import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { CreateBranchDialog } from '@components/Dialogs/CreateBranchDialog';
import { BranchList } from '@components/Lists/Branches/BranchList';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';

type Props = {};

const Branches: NextPage = (props: Props) => {
	const { user } = useAuth();
	const [employerName, setEmployerName] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const employer = localStorage.getItem('employerName');
			setEmployerName(employer ?? 'Lasitha');
		}
	}, []);

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	return (
		<>
			<Head>
				<title>Branches - Employer Simplwork</title>
			</Head>
			<ProtectedPage>
				<div className='flex flex-col justify-center items-center'>
					<div className='max-w-2xl w-full pt-10 gap-5 flex flex-col'>
						<div className='self-end'>
							<CreateBranchDialog employerName={employerName} />
						</div>
						<BranchList branches={branches ?? []} />
					</div>
				</div>
			</ProtectedPage>
		</>
	);
};

export default Branches;
