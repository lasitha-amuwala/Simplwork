import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { DialogFormLayout } from '../Dialogs/DialogFormLayout';
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

type CreatePostingFormProps = { afterSave: () => void };

export const CreatePostingForm = ({ afterSave }: CreatePostingFormProps) => {
	const { user, employerName } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [shifts, setShifts] = useState<SW.IShift[]>([]);

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	const { mutate } = useMutation({
		mutationFn: (data: any) => {
			if (branches) return SimplworkApi.post(`employer/postings?employerName=${employerName}&branchName=${data.branch}`, data.data);
			return Promise.reject();
		},
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => {
			alert('There was an issue creating job posting, please try again later.');
			afterSave();
		},
	});

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

	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits, branch, estimatedHours }: FormikValues) => {
		setSaving(true);
		const data: IPostPosting = {
			positionTitle,
			pay,
			jobDescription,
			benefits,
			fixedSchedule,
			shifts,
			estimatedHours,
			industryType: 'RETAIL',
		};
		mutate({ data, branch });
		afterSave();
	};

	const initialValues: PostingValues = {
		positionTitle: '',
		pay: 0,
		fixedSchedule: false,
		jobDescription: '',
		estimatedHours: 0,
		benefits: '',
		branch: '',
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm branches={branches} shifts={shifts} setShifts={setShifts} />
		</DialogFormLayout>
	);
};
