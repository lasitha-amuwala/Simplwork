import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { DialogClose } from '../Dialog';
import { FieldControl } from '../../FieldControl';
import { GenderSelect } from '../../GenderSelect';
import { SimplworkApi } from '../../../utils/simplwork';
import { Form, Formik, FormikValues } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileValidationSchema } from '../../SignUp/SignUpFlow';

type ProfileForm = { profileData: any; afterSave: () => void };

export const ProfileForm = ({ profileData, afterSave }: ProfileForm) => {
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);

	const initialValues = {
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
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={profileValidationSchema}>
			{({ values, setFieldValue }) => (
				<Form noValidate>
					<fieldset disabled={saving} className='group'>
						<div className='flex flex-col gap-2 my-5'>
							<FieldControl name='fullName' label='Name' type='text' />
							<div className='flex gap-5'>
								<FieldControl name='age' label='Age' type='number' min={14} max={100} errorBelow />
								<GenderSelect />
							</div>
							<FieldControl name='phoneNumber' label='Phone Number' type='tel' placeholder='XXX-XXX-XXXX' />
						</div>
						<div className='flex w-full justify-end gap-3'>
							<DialogClose aria-label='Close' asChild>
								<button type='button' className='button' aria-label='Close'>
									Cancel
								</button>
							</DialogClose>
							<button
								type='submit'
								className='inline-flex justify-center items-center bg-green-100 py-2 px-3 rounded text-green-700 font-medium hover:bg-green-200 group-disabled:pointer-events-none'>
								<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
								<span className='group-disabled:opacity-0'>Save Changes</span>
							</button>
						</div>
					</fieldset>
				</Form>
			)}
		</Formik>
	);
};
