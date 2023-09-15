import { Card } from '@components/Card';
import { EditBranchDialog } from '@components/Dialogs/BranchEditDialog';
import React from 'react';

export type BranchEditProps = {
	branch: SW.Employer.IBranch;
};

export const BranchListItem = ({ branch }: BranchEditProps) => {
	return (
		<Card className='w-full'>
			<div className='flex justify-between items-center'>
				<h1 className='font-semibold'>{branch.branchName}</h1>
				<div>
					<EditBranchDialog data={branch} />
				</div>
			</div>
			<p className='text-gray-500'>{branch.location.fullAddress}</p>
		</Card>
	);
};
