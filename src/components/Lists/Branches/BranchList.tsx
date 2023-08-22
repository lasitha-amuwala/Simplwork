import React from 'react';
import { BranchListItem } from './BranchListItem';

type BranchListProps = { branches: SW.Employer.IBranch[] };

export const BranchList = ({ branches }: BranchListProps) => {
	if (branches.length == 0) return <div className='p-5 bg-gray-100 text-center'>No branch information to display</div>;
	return (
		<div className='max-h-[300px] flex flex-col gap-3'>
			{branches?.map((branch, i) => (
				<BranchListItem branch={branch} key={`${branch.branchName}-${i}`} />
			))}
		</div>
	);
};
