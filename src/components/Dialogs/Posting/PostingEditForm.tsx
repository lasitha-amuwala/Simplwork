import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DialogFormLayout } from '../DialogFormLayout';
import { PostingForm, PostingValues } from '@components/Formik/Forms/PostingForm';
import { jobPostingValidationSchema } from '@components/Formik/FormValidation';

type EditPostingForm = {
	data: SW.IPosting;
};

export const PostingEditForm = ({ data: posting }: EditPostingForm) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [shifts, setShifts] = useState<SW.IShift[] | []>(posting?.shifts ?? []);

	const { mutate } = useMutation({
		mutationFn: (data: any) =>
			SimplworkApi.patch(`employer/postings/${posting.id}`, JSON.stringify(data.data), {
				headers: { 'Content-Type': 'application/json-patch+json' },
			}),
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

	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits, estimatedHours }: FormikValues) => {
		setSaving(true);

		const data = [
			{ op: 'replace', path: `/shifts`, value: shifts },
			{ op: 'replace', path: '/positionTitle', value: positionTitle },
			{ op: 'replace', path: '/pay', value: pay },
			{ op: 'replace', path: '/jobDescription', value: jobDescription },
			{ op: 'replace', path: '/benefits', value: benefits },
			{ op: 'replace', path: '/fixedSchedule', value: fixedSchedule },
			{ op: 'replace', path: '/estimatedHours', value: estimatedHours },
		];
		mutate({ data });
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm branches={[]} shifts={shifts} setShifts={setShifts} branchesDisabled />
		</DialogFormLayout>
	);
};
