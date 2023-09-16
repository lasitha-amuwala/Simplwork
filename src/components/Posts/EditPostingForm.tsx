import { useState } from 'react';
import { Formik, FormikValues } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { DialogFormLayout } from '../Dialogs/DialogFormLayout';
import { jobPostingValidationSchema } from '../Formik/FormValidation';
import { PostingForm } from '../Formik/Forms/PostingForm';
import { useAuth } from '../Auth/AuthProvider';
import { createAvailabilityObject } from '@components/AvailabilityWidget/logic';

export type PostingValues = {
	positionTitle: string;
	pay: number;
	fixedSchedule: boolean;
	jobDescription: string;
	estimatedHours: number;
	benefits: string;
	branch: string;
};

type EditPostingForm = {};

export const EditPostingForm = ({}: EditPostingForm) => {
	const { user, employerName } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [availability, setAvailability] = useState<SW.IAvailability>(createAvailabilityObject());

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
		},
	});

	interface IPostPosting {
		positionTitle: string;
		pay: number;
		jobDescription: string;
		benefits: string;
		fixedSchedule: boolean;
		industryType: string;
		shifts: SW.IShift[];
	}

	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits, branch }: FormikValues) => {
		setSaving(true);
		const data: IPostPosting = {
			positionTitle,
			pay,
			jobDescription,
			benefits,
			fixedSchedule,
			shifts: [{ dayOfWeek: 1, shiftTimes: { startTime: 0, endTime: 120 } }],
			industryType: 'RETAIL',
		};
		mutate({ data, branch });
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
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{() => <PostingForm branches={branches} availability={availability} setAvailability={setAvailability} />}
		</Formik>
	);
};
