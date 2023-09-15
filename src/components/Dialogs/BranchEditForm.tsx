import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { BranchValidationSchema } from '@components/Formik/FormValidation';
import { BranchForm } from '@components/Formik/Forms/BranchForm';

type BranchValueType = {
	branchName: string;
};

type BranchEditFormProps = { employerName: string; afterSave: () => void; data: SW.Employer.IBranch };

export const BranchEditForm = ({ employerName, afterSave, data }: BranchEditFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [location, setLocation] = useState<SW.ILocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const initialValues: BranchValueType = { branchName: data.branchName ?? '' };

	const { mutate } = useMutation({
		mutationFn: ({ employerName, branchName, data }: { employerName: string; branchName: string; data: any }) =>
			SimplworkApi.patch(`employer/${employerName}/branch?branchName=${branchName}`, JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json-patch+json' },
			}),
		onSuccess: () => queryClient.invalidateQueries(),
		onError: (err) => {
			alert('There was an issue editing your branch, please try again later.');
			afterSave();
		},
	});

	const onSubmit = ({ branchName }: FormikValues) => {
		setSaving(true);
		const data = [
			{
				op: 'replace',
				path: `/`,
				value: { branchName, location },
			},
		];
		mutate({ employerName, branchName, data });
		afterSave();
	};

	const updateLocation = (location: SW.ILocation) => setLocation(location);

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={BranchValidationSchema} formDisabled={saving}>
			<BranchForm updateLocation={updateLocation} />
		</DialogFormLayout>
	);
};
