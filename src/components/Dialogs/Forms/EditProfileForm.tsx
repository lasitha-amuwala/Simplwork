import { useState } from 'react';
import { SimplworkApi } from '../../../utils/simplwork';
import { FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ValueUserTypes } from '../../SignUp/SignUpFlow';
import { DialogFormLayout } from './DialogFormLayout';
import { ProfileForm } from './ProfileForm';
import { profileValidationSchema } from '../../FormValidation';

type EditProfileForm = { profileData: any; afterSave: () => void };

export const EditProfileForm = ({ profileData, afterSave }: EditProfileForm) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues: ValueUserTypes = {
		fullName: profileData.candidateName ?? '',
		gender: profileData.gender ?? '',
		phoneNumber: profileData.phoneNumber ?? '',
		age: profileData.age ?? '',
	};

	const patchCandidate = (data: any) => {
		return SimplworkApi.patch('candidate', JSON.stringify(data), { headers: { 'Content-Type': 'application/json-patch+json' } });
	};

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue updating your profile, please try again later.');
			afterSave();
		},
	});

	const onSubmit = async ({ fullName, age, gender, phoneNumber }: FormikValues) => {
		setSaving(true);

		const data = [
			{ op: 'replace', path: '/user/name', value: fullName },
			{ op: 'replace', path: '/user/age', value: age },
			{ op: 'replace', path: '/user/gender', value: gender },
			{ op: 'replace', path: '/user/phoneNumber', value: phoneNumber },
		];

		await mutateAsync(data);
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={profileValidationSchema} formDisabled={saving}>
			<ProfileForm />
		</DialogFormLayout>
	);
};
