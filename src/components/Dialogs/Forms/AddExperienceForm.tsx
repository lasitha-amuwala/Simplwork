import { useState } from 'react';
import { patchCandidate } from '../../../utils/simplwork';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogFormLayout } from './DialogFormLayout';
import { ExperienceForm } from './ExperienceForm';
import { workHistoryValidationSchema } from '../../SignUp/SignUpFlow';

type AddExperienceFormProps = { afterSave: () => void };

export const AddExperienceForm = ({ afterSave }: AddExperienceFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

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
		const data = [{ op: 'add', path: '/candidateProfile/workHistory/-', value: { positionTitle, companyName, details } }];
		await mutateAsync(data);
		afterSave();
	};

	return (
		<DialogFormLayout onSubmit={onSubmit} validationSchema={workHistoryValidationSchema} formDisabled={saving}>
			<ExperienceForm />
		</DialogFormLayout>
	);
};
