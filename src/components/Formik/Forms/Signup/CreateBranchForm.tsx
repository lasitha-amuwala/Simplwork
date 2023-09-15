import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi } from '@utils/simplwork';
import { FormikValues } from 'formik';
import { useState } from 'react';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { BranchForm } from '../BranchForm';
import { BranchValidationSchema } from '@components/Formik/FormValidation';

type SignUpBranchProps = { employerName: string; afterSave: () => void };
type Values = { branchName: string };

export const CreateBranchForm = ({ employerName, afterSave }: SignUpBranchProps) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [location, setLocation] = useState<SW.ILocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const initialValues: Values = { branchName: '' };

	const { mutate } = useMutation({
		mutationFn: (data: { branchName: string; location: SW.ILocation }) => SimplworkApi.post(`employer/${employerName}/branch`, data),
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => alert('There was an issue adding the branch, please try again later.'),
	});

	const onSubmit = ({ branchName }: FormikValues) => {
		setSaving(true);
		mutate({ branchName, location });
		afterSave();
	};

	const updateLocation = (location: SW.ILocation) => setLocation(location);

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={BranchValidationSchema} formDisabled={saving}>
			<BranchForm updateLocation={updateLocation} />
		</DialogFormLayout>
	);
};
