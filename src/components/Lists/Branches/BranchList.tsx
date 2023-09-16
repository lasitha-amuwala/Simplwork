import React from 'react';
import { BranchListItem } from './BranchListItem';

type BranchListProps = { branches: SW.Employer.IBranch[]; employerName: string };

export const BranchList = ({ branches, employerName }: BranchListProps) => {
	if (branches.length == 0) return <div className='p-5 bg-gray-100 text-center'>No branch information to display</div>;
	return (
		<div className='flex flex-col gap-3'>
			{branches?.map((branch, i) => (
				<BranchListItem key={`${branch.branchName}-${i}`} branch={branch} employerName={employerName} />
			))}
		</div>
	);
};
