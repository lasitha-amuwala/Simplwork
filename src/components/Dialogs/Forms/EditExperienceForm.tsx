import { useState } from 'react';
import { WorkHistory } from '../../ExperienceList';
import { FormikValues } from 'formik';
import { patchCandidate } from '../../../utils/simplwork';
import { DialogFormLayout } from './DialogFormLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExperienceForm } from './ExperienceForm';
import { formatDate } from '@/src/utils/helpers';
import dayjs from 'dayjs';
import { workHistoryValidationSchema } from '../../FormValidation';

type WorkExperienceFormProps = { afterSave: () => void; index: number; data: WorkHistory };

export const WorkExperienceForm = ({ afterSave, index, data }: WorkExperienceFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues = {
		positionTitle: data.positionTitle ?? '',
		companyName: data.companyName ?? '',
		startDate: data.startDate ?? '',
		endDate: dayjs(data.endDate).format('YYYY-MM-DD') ?? '',
		details: data.details ?? '',
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: (err) => {
			console.log(err)
			alert('There was an issue editing your work experience, please try again later.');
			afterSave();
		},
	});

	const onSubmit = async ({ positionTitle, companyName, startDate, endDate, details }: FormikValues) => {
		setSaving(true);

		const data = [
			{
				op: 'replace',
				path: `/candidateProfile/workHistory/${index}`,
				value: { positionTitle, companyName, details, startDate: formatDate(startDate), endDate: formatDate(endDate) },
			},
		];
		await mutateAsync(data);
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema}>
			<ExperienceForm />
		</DialogFormLayout>
	);
};
