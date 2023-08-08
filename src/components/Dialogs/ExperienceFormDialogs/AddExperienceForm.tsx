import { useState } from 'react';
import { patchCandidate } from '../../../utils/simplwork';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogFormLayout } from '../DialogFormLayout';
import { ExperienceForm } from '../../Formik/Forms/ExperienceForm';
import { formatDate } from '@/src/utils/helpers';
import { workHistoryValidationSchema } from '../../Formik/FormValidation';
import { WorkHistoryValuesType } from './EditExperienceForm';

type AddExperienceFormProps = { afterSave: () => void };

export const AddExperienceForm = ({ afterSave }: AddExperienceFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues: WorkHistoryValuesType = {
		positionTitle: '',
		companyName: '',
		startDate: '',
		endDate: '',
		details: '',
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue adding your work experience, please try again later.');
			afterSave();
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
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema} formDisabled={saving}>
			<ExperienceForm />
		</DialogFormLayout>
	);
};
