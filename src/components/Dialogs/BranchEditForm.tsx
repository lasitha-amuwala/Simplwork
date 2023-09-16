import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { BranchValidationSchema } from '@components/Formik/FormValidation';
import { BranchForm } from '@components/Formik/Forms/BranchForm';
import { useAuth } from '@components/Auth/AuthProvider';

type BranchValueType = {
	branchName: string;
};

type BranchEditFormProps = { employerName: string; afterSave: () => void; branch: SW.Employer.IBranch };

export const BranchEditForm = ({ employerName, afterSave, branch }: BranchEditFormProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [location, setLocation] = useState<SW.ILocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const initialValues: BranchValueType = { branchName: branch.branchName ?? '' };

	const { mutate } = useMutation({
		mutationFn: (data: { employerName: string; oldbranchName: string; data: any }) =>
			SimplworkApi.patch(`employer/${data.employerName}/branch?branchName=${data.oldbranchName}`, JSON.stringify(data.data), {
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
				path: `/branchName`,
				value: branchName,
			},
			{ op: 'replace', path: '/location', value: location },
		];
		mutate({ employerName, oldbranchName: branch.branchName, data });
		afterSave();
	};

	const updateLocation = (location: SW.ILocation) => setLocation(location);

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={BranchValidationSchema} formDisabled={saving}>
			<BranchForm updateLocation={updateLocation} />
		</DialogFormLayout>
	);
};
