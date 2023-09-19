import React, { useState, useEffect } from 'react';
import { DialogContentLayout } from '../DialogContentLayout';
import { HiOutlinePlus } from 'react-icons/hi';
import { PostingCreateForm } from './PostingCreateForm';
import { queries } from '@utils/simplwork';
import { useAuth } from '@components/Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';

type Props = {};

export const PostingCreateDialog = (props: Props) => {
	const { user, employerName } = useAuth();
	const [open, setOpen] = useState<boolean>(false);

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName as string, { pageSize: '20', pageNo: '0' }));

	const handleOpen = (isOpen: boolean) => {
		if (isOpen) {
			if (branches && branches?.length > 0) {
				setOpen(true);
			} else {
				alert('You must have a branch before creating a job posting');
			}
		} else {
			setOpen(false);
		}
	};

	const TriggerButton = () => (
		<div className='flex gap-2 items-center'>
			<HiOutlinePlus className='text-xl' />
			<p className='tracking-wide'>Create Job Posting</p>
		</div>
	);

	return (
		<DialogContentLayout
			open={open}
			setOpen={handleOpen}
			triggerLabel={<TriggerButton />}
			title='Create Job Posting'
			description={`Create and post job posting. Click save when you're done.`}>
			<div className='w-[550px]'>
				<PostingCreateForm afterSave={() => setOpen(false)} />
			</div>
		</DialogContentLayout>
	);
};
