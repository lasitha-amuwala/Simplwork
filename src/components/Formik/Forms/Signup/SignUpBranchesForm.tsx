import { useAuth } from '@components/Auth/AuthProvider';
import { SaveChangesButton } from '@components/Buttons/SaveChangesButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BranchForm } from '../BranchForm';
import { BranchList } from '../../../Lists/Branches/BranchList';

type SignUpBranchProps = { employerName: string };
type Values = { branchName: string };

export const SignUpBranchForm = ({ employerName }: SignUpBranchProps) => {
	const { user } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [location, setLocation] = useState<SW.ILocation>({ latitude: 0, longitude: 0, postalCode: '' });

	const initialValues: Values = { branchName: '' };

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	const { mutate } = useMutation({
		mutationFn: (data: { branchName: string; location: SW.ILocation }) => SimplworkApi.post(`employer/${employerName}/branch`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['branches', employerName, {}] }),
		onError: () => alert('There was an issue adding the branch, please try again later.'),
	});

	const onSubmit = ({ branchName }: FormikValues, { resetForm }: FormikHelpers<Values>) => {
		setSaving(true);
		mutate({ branchName, location });
		resetForm();
		setSaving(false);
	};

	const updateLocation = (location: SW.ILocation) => setLocation(location);

	if (isError) router.push('/');
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='flex flex-col gap-5'>
			{branches && branches.length !== 0 && <BranchList branches={branches} />}
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{() => (
					<Form noValidate>
						<fieldset disabled={saving} className='group flex flex-col gap-5'>
							<BranchForm updateLocation={updateLocation} afterSave={() => setSaving(false)} />
							<div className='text-end'>
								<SaveChangesButton />
							</div>
						</fieldset>
					</Form>
				)}
			</Formik>
		</div>
	);
};
