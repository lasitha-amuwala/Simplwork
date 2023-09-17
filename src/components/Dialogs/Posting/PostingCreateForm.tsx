import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { useAuth } from '@components/Auth/AuthProvider';
import { DialogFormLayout } from '../DialogFormLayout';
import { PostingForm, PostingValues } from '@components/Formik/Forms/PostingForm';
import { jobPostingValidationSchema } from '@components/Formik/FormValidation';

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

type PostingCreateFormProps = { afterSave: () => void };

export const PostingCreateForm = ({ afterSave }: PostingCreateFormProps) => {
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

	const initialValues: PostingValues = {
		positionTitle: '',
		pay: 0,
		fixedSchedule: false,
		jobDescription: '',
		estimatedHours: 0,
		benefits: '',
		branch: '',
	};

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

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm branches={branches} shifts={shifts} setShifts={setShifts} />
		</DialogFormLayout>
	);
};
