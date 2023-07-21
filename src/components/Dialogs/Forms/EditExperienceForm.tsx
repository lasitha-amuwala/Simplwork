import { useState } from 'react';
import { WorkHistory } from '../../ExperienceList';
import { FormikValues } from 'formik';
import { patchCandidate } from '../../../utils/simplwork';
import { DialogFormLayout } from './DialogFormLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExperienceForm } from './ExperienceForm';
import { workHistoryValidationSchema } from '../../SignUp/SignUpFlow';

type WorkExperienceFormProps = { afterSave: () => void; index: number; data: WorkHistory };

export const WorkExperienceForm = ({ afterSave, index, data }: WorkExperienceFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues = {
		positionTitle: data.positionTitle ?? '',
		companyName: data.companyName ?? '',
		startDate: data.startDate ?? '',
		endDate: data.endDate ?? '',
		details: data.details ?? '',
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue editing your work experience, please try again later.');
			afterSave();
		},
	});

	const onSubmit = async ({ positionTitle, companyName, startDate, endDate, details }: FormikValues) => {
		setSaving(true);
		const data = [{ op: 'replace', path: `/candidateProfile/workHistory/${index}`, value: { positionTitle, companyName, details } }];
		await mutateAsync(data);
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema}>
			<ExperienceForm />
		</DialogFormLayout>
	);
};
