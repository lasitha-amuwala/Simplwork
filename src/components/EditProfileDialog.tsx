import { SimplworkApi, queries } from '../utils/simplwork';
import { useAuth } from './Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik, FormikValues, useFormikContext } from 'formik';
import { FieldControl } from './FieldControl';
import { GenderSelect } from './GenderSelect';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './Dialog';
import { FormEvent, useState } from 'react';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const EditProfileDialog = () => {
	const { user } = useAuth();
	const { data } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));
	const [open, setOpen] = useState(false);

	let initialValues = {};

	if (data) {
		initialValues = {
			name: data.candidateName,
			gender: data.gender,
			phoneNumber: data.phoneNumber,
			age: data.age,
		};
	}

	const onSubmit = ({ name, age, gender, phoneNumber }: FormikValues) => {
		const data = [
			{ op: 'replace', path: '/user/name', value: name },
			// { op: 'replace', path: '/user/age', value: age },
			// { op: 'replace', path: '/user/gender', value: gender },
			// { op: 'replace', path: '/user/phoneNumber', value: phoneNumber },
		];
		console.log(JSON.stringify(data, null, 2));
		SimplworkApi.patch('candidate', JSON.stringify(data), { headers: { 'Content-Type': 'application/json-patch+json' } })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log('errrrror', err);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className='button'>Edit Profile</button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ values, setFieldValue }) => (
						<Form noValidate>
							<div className='flex flex-col gap-2 my-5'>
								<FieldControl name='name' label='Name' type='text' />
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

								<button type='submit' className='bg-green-100 py-2 px-3 rounded text-green-700 font-medium hover:bg-green-200'>
									Save Changes
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};
