import { useState } from 'react';
import { FormikValues } from 'formik';
import { SimplworkApi } from '@utils/simplwork';
import { FieldControl } from '@components/Formik/inputs/FieldControl';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employerDescription } from '@components/Formik/FormValidation';
import { useAuth } from '@components/Auth/AuthProvider';

type EmployerProfileEditForm = { employerData: SW.Employer.IEmployer; afterSave: () => void };

export const EmployerProfileEditForm = ({ employerData, afterSave }: EmployerProfileEditForm) => {
	const { employerName } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues = {
		comapnyName: employerData.companyName ?? '',
		companyDescription: employerData.companyDescription ?? '',
	};

	const { mutate } = useMutation({
		mutationFn: (data: any) =>
			SimplworkApi.patch(`employer/${data.employerName}`, JSON.stringify(data.data), {
				headers: { 'Content-Type': 'application/json-patch+json' },
			}),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [`employer/${employerName}`] }),
		onError: () => {
			alert('There was an issue updating your profile, please try again later.');
			afterSave();
		},
	});

	const onSubmit = ({ companyDescription }: FormikValues) => {
		setSaving(true);
		const data = [{ op: 'replace', path: '/companyDescription', value: companyDescription }];
		mutate({ employerName, data });
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={employerDescription} formDisabled={saving}>
			<div className='pb-5'>
				<FieldControl name='companyDescription' label='Company Description' type='text' />
			</div>
		</DialogFormLayout>
	);
};
