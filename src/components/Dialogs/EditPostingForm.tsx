import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { DialogFormLayout } from './DialogFormLayout';
import { jobPostingValidationSchema } from '../Formik/FormValidation';
import { PostingForm } from '../Formik/Forms/PostingForm';
import { useAuth } from '../Auth/AuthProvider';

export type PostingValues = {
	positionTitle: string;
	pay: number;
	fixedSchedule: boolean;
	jobDescription: string;
	estimatedHours: number;
	benefits: string;
	branch: string;
};

interface IPostPosting {
	positionTitle: string;
	pay: number;
	jobDescription: string;
	benefits: string;
	fixedSchedule: boolean;
	estimatedHours: number;
	industryType: string;
	shifts: SW.IShift[];
}

type EditPostingForm = {
	data: SW.IPosting;
};

export const EditPostingForm = ({ data: posting }: EditPostingForm) => {
	const { user, employerName } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [shifts, setShifts] = useState<SW.IShift[] | []>(posting?.shifts ?? []);

	const { data: branches } = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	const { mutate } = useMutation({
		mutationFn: (data: any) => {
			if (branches)
				return SimplworkApi.patch(`employer/postings/${posting.id}`, JSON.stringify(data.data), {
					headers: { 'Content-Type': 'application/json-patch+json' },
				});
			return Promise.reject();
		},
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => {
			alert('There was an issue editing job posting, please try again later.');
		},
	});

	const initialValues: PostingValues = {
		positionTitle: posting?.positionTitle ?? '',
		pay: posting?.pay ?? 0,
		fixedSchedule: posting?.isFixedSchedule ?? false,
		jobDescription: posting?.jobDescription ?? '',
		estimatedHours: posting?.estimatedHours ?? 0,
		benefits: posting?.benefits ?? '',
		branch: posting?.employer.branches[0].branchName ?? '',
	};

	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits, branch, estimatedHours }: FormikValues) => {
		setSaving(true);

		const data = [
			{ op: 'replace', path: `/shifts`, value: shifts },
			{ op: 'replace', path: '/positionTitle', value: positionTitle },
			{ op: 'replace', path: '/pay', value: pay },
			{ op: 'replace', path: '/jobDescription', value: jobDescription },
			{ op: 'replace', path: '/benefits', value: benefits },
			{ op: 'replace', path: '/fixedSchedule', value: fixedSchedule },
			{ op: 'replace', path: '/estimatedHours', value: estimatedHours },
			// { op: 'replace', path: '/branch', value: branch },
		];
		mutate({ data, branch });
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm branches={branches} shifts={shifts} setShifts={setShifts} />
		</DialogFormLayout>
	);
};
