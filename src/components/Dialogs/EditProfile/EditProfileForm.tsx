import { useState } from 'react';
import { FormikValues } from 'formik';
import { SimplworkApi } from '@utils/simplwork';
import { ProfileForm } from '@components/Formik/Forms/ProfileForm';
import { FieldControl } from '@components/Formik/inputs/FieldControl';
import { DialogFormLayout } from '@components/Dialogs/DialogFormLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileValidationSchema } from '@components/Formik/FormValidation';

type EditProfileForm = { profileData: any; afterSave: () => void };

export const EditProfileForm = ({ profileData, afterSave }: EditProfileForm) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues = {
		fullName: profileData.candidateName ?? '',
		gender: profileData.gender ?? '',
		phoneNumber: profileData.phoneNumber ?? '',
		age: profileData.age ?? '',
		maxTravelTimes: profileData.maxTravelTimes ?? '',
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

	const submitUserInformation = async ({ fullName, age, gender, phoneNumber }: FormikValues) => {
		const data = [
			{ op: 'replace', path: '/user/name', value: fullName },
			{ op: 'replace', path: '/user/age', value: age },
			{ op: 'replace', path: '/user/gender', value: gender },
			{ op: 'replace', path: '/user/phoneNumber', value: phoneNumber },
		];
		await mutateAsync(data);
	};

	const submitCommutePreferences = async ({ maxTravelTimes }: FormikValues) => {
		const data = [{ op: 'replace', path: '/candidateProfile/maxTravelTimes', value: maxTravelTimes }];
		await mutateAsync(data);
	};

	const onSubmit = (values: FormikValues) => {
		setSaving(true);
		submitUserInformation(values);
		submitCommutePreferences(values);
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={profileValidationSchema} formDisabled={saving}>
			<h1 className='font-semibold text-xl pt-10'>Profile:</h1>
			<ProfileForm />
			<h1 className='font-semibold text-xl pt-10'>Commute Prefrences:</h1>
			<div className='grid grid-cols-2 grid-rows-2 gap-5 pb-5'>
				<FieldControl name='maxTravelTimes.CAR' label='Commute by car'></FieldControl>
				<FieldControl name='maxTravelTimes.BIKE' label='Commute by car'></FieldControl>
				<FieldControl name='maxTravelTimes.WALK' label='Commute by walking'></FieldControl>
				<FieldControl name='maxTravelTimes.PUBLIC_TRANSIT' label='Commute by public transit'></FieldControl>
			</div>
		</DialogFormLayout>
	);
};
