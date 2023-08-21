import React from 'react';

type BranchListProps = { branches: SW.Employer.IBranch[] };

export const BranchList = ({ branches }: BranchListProps) => {
	if (branches.length == 0) return <div className='p-5 bg-gray-100 text-center'>No branch information to display</div>;
	return (
		<div className='max-h-[300px] flex flex-col gap-3'>
			{branches?.map(({ branchName, location }, i) => (
				<div key={`${branchName}-${i}`} className='p-5 rounded bg-gray-100 flex gap-5'>
					<h1 className='font-semibold'>{branchName}</h1>
					<h1 className='font-medium'>{location.postalCode}</h1>
				</div>
			))}
		</div>
	);
};
