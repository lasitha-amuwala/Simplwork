import { HiOutlinePlus } from 'react-icons/hi';
import { useAuth } from './Auth/AuthProvider';
import { ExperienceForm } from './Dialogs/Forms/ExperienceForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { patchCandidate, queries } from '../utils/simplwork';
import { ExperienceList } from './ExperienceList';
import { AddExperienceDialog } from './Dialogs/AddExperienceDialog';
import { Form, Formik, FormikValues } from 'formik';
import { SaveChangesButton } from './Buttons/SaveChangesButton';
import { useState } from 'react';
import { workHistoryValidationSchema } from './SignUp/SignUpFlow';
import { useRouter } from 'next/router';

type Props = {};

export const SignUpExperienceForm = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const { data: candidate, isLoading, isError } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));

	const { mutateAsync } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue adding your work experience, please try again later.');
		},
	});

	const onSubmit = async ({ positionTitle, companyName, startDate, endDate, details }: FormikValues) => {
		setSaving(true);
    console.log('props')
		const data = [{ op: 'add', path: '/candidateProfile/workHistory/-', value: { positionTitle, companyName, details } }];
		await mutateAsync(data);
	};

	const initialValues = {};

	if (isError) {
		router.push('/');
	}
	if (isLoading) return <div>Loading...</div>;
	if (candidate.workHistory.length == 0) {
		return (
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={workHistoryValidationSchema}>
				{({ values, setFieldValue }) => (
					<Form noValidate>
						<fieldset disabled={saving} className='group'>
							<ExperienceForm />
							<div className='text-end'>
								<SaveChangesButton />
							</div>
						</fieldset>
					</Form>
				)}
			</Formik>
		);
	}
	return (
		<div className='flex flex-col gap-5'>
			<ExperienceList history={candidate.workHistory} />
			<AddExperienceDialog />
		</div>
	);
};
