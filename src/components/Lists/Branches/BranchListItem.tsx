import React from 'react';

type BranchListItemProps = {
	branch: SW.Employer.IBranch;
};

export const BranchListItem = ({ branch }: BranchListItemProps) => {
	return (
		<div className='p-5 rounded bg-gray-100 flex gap-5'>
			<h1 className='font-semibold'>{branch.branchName}</h1>
			<h1 className='font-medium'>{branch.location.postalCode}</h1>
		</div>
	);
};
