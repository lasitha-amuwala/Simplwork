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
	industryType: string;
	shifts: SW.IShift[];
}

type EditPostingForm = {
	data: SW.IPosting;
};

export const EditPostingForm = ({ data }: EditPostingForm) => {
	const { user, employerName } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [shifts, setShifts] = useState<SW.IShift[] | []>(data?.shifts ?? []);

	const { data: branches } = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	const { mutate } = useMutation({
		mutationFn: (data: any) => {
			if (branches) return SimplworkApi.post(`employer/postings?employerName=${employerName}&branchName=${data.branch}`, data.data);
			return Promise.reject();
		},
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => {
			alert('There was an issue editing job posting, please try again later.');
		},
	});

	const initialValues: PostingValues = {
		positionTitle: data?.positionTitle ?? '',
		pay: data?.pay ?? 0,
		fixedSchedule: data?.isFixedSchedule ?? false,
		jobDescription: data?.jobDescription ?? '',
		estimatedHours: data?.estimatedHours ?? 0,
		benefits: data?.benefits ?? '',
		branch: data?.employer.branches[0].branchName ?? '',
	};

	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits, branch }: FormikValues) => {
		setSaving(true);
		const data: IPostPosting = {
			positionTitle,
			pay,
			jobDescription,
			benefits,
			fixedSchedule,
			shifts,
			industryType: 'RETAIL',
		};
		mutate({ data, branch });
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm branches={branches} shifts={shifts} setShifts={setShifts} />
		</DialogFormLayout>
	);
};
