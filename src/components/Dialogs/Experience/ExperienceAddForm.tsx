import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils/helpers';
import { patchCandidate } from '@utils/simplwork';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { WorkExperienceForm } from '@components/Formik/Forms/WorkExperienceForm';
import { workHistoryValidationSchema } from '@components/Formik/FormValidation';
import { WorkHistoryValuesType } from './ExperienceEditForm';
import dayjs from 'dayjs';

type ExperienceAddFormProps = { afterSave?(): void };

export const ExperienceAddForm = ({ afterSave }: ExperienceAddFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues: WorkHistoryValuesType = {
		positionTitle: '',
		companyName: '',
		startDate: dayjs().toDate(),
		endDate: dayjs().toDate(),
		details: '',
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue adding your work experience, please try again later.');
			!!afterSave && afterSave();
		},
	});

	const onSubmit = async ({ positionTitle, companyName, startDate, endDate, details }: FormikValues) => {
		setSaving(true);
		const data = [
			{
				op: 'add',
				path: '/candidateProfile/workHistory/-',
				value: { positionTitle, companyName, details, startDate: formatDate(startDate), endDate: formatDate(endDate) },
			},
		];
		await mutateAsync(data);
		!!afterSave && afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema} formDisabled={saving}>
			<WorkExperienceForm />
		</DialogFormLayout>
	);
};
