import { useAuth } from '@components/Auth/AuthProvider';
import { Card } from '@components/Card';
import { BranchDeleteDialog } from '@components/Dialogs/BranchDeleteDialog';
import { EditBranchDialog } from '@components/Dialogs/BranchEditDialog';
import React from 'react';

export type BranchEditProps = {
	branch: SW.Employer.IBranch;
	employerName: string;
};

export const BranchListItem = ({ branch, employerName }: BranchEditProps) => {
	return (
		<Card className='w-full'>
			<div className='flex justify-between items-center'>
				<h1 className='font-semibold'>{branch.branchName}</h1>
				<div className='flex gap-3'>
					<EditBranchDialog employerName={employerName} branch={branch} />
					<BranchDeleteDialog employerName={employerName} branchName={branch.branchName} />
				</div>
			</div>
			<p className='text-gray-500'>{branch.location.fullAddress}</p>
		</Card>
	);
};
