import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils/helpers';
import { WorkHistory } from '@components/Lists/Experience/ExperienceList';
import { patchCandidate } from '@utils/simplwork';
import { ExperienceForm } from '@components/Formik/Forms/ExperienceForm';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { workHistoryValidationSchema } from '@components/Formik/FormValidation';

type WorkExperienceFormProps = { afterSave: () => void; index: number; data: WorkHistory };

export type WorkHistoryValuesType = {
	positionTitle: string;
	companyName: string;
	startDate: string;
	endDate: string;
	details: string;
};

export const WorkExperienceForm = ({ afterSave, index, data }: WorkExperienceFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues: WorkHistoryValuesType = {
		positionTitle: data.positionTitle ?? '',
		companyName: data.companyName ?? '',
		startDate: data.startDate ?? '',
		endDate: data.endDate ?? '',
		details: data.details ?? '',
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: (err) => {
			console.log(err);
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
				value: { positionTitle, companyName, details, startDate: formatDate(startDate), endDate: endDate ? formatDate(endDate) : '' },
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
