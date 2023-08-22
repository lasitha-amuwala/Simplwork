import { useState } from 'react';
import { FormikValues } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { DialogFormLayout } from '../Dialogs/DialogFormLayout';
import { jobPostingValidationSchema } from '../Formik/FormValidation';
import { constructAvailabilityObject } from '../AvailabilityWidget';
import { PostingForm } from '../Formik/Forms/PostingForm';
import { useAuth } from '../Auth/AuthProvider';

type CreatePostingFormProps = { afterSave: () => void };

export const CreatePostingForm = ({ afterSave }: CreatePostingFormProps) => {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [saving, setSaving] = useState(false);
	const [location, setLocation] = useState<SW.ILocation>({ latitude: 0, longitude: 0, postalCode: '' });
	const [availability, setAvailability] = useState<SW.IAvailability>(constructAvailabilityObject());

	type PostingValues = {
		positionTitle: string;
		pay: number;
		fixedSchedule: boolean;
		jobDescription: string;
		estimatedHours: number;
		benefits: string;
	};

	const initialValues: PostingValues = {
		positionTitle: '',
		pay: 0,
		fixedSchedule: false,
		jobDescription: '',
		estimatedHours: 0,
		benefits: '',
	};

	const employerName = window.localStorage.getItem('employerName') ?? '';

	const {
		data: branches,
		isError,
		isLoading,
	} = useQuery(queries.employer.getBranches(user?.credential ?? '', employerName, { pageSize: '20', pageNo: '0' }));

	const { mutate } = useMutation({
		mutationFn: (data: any) => {
			if (branches) return SimplworkApi.post(`employer/postings?employerName=${employerName}&branchName=${branches[0].branchName}`, data);
			return Promise.reject();
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue creating job posting, please try again later.');
			afterSave();
		},
	});

	interface IPostPosting {
		positionTitle: string;
		pay: number;
		jobDescription: string;
		benefits: string;
		fixedSchedule: boolean;
		industryType: string;
		shifts: SW.IShift[];
	}
	const onSubmit = async ({ positionTitle, pay, jobDescription, fixedSchedule, benefits }: FormikValues) => {
		setSaving(true);
		const data: IPostPosting = {
			positionTitle,
			pay,
			jobDescription,
			benefits,
			fixedSchedule,
			shifts: [{ dayOfWeek: 1, shiftTimes: { startTime: 0, endTime: 120 } }],
			industryType: 'RETAIL',
		};
		mutate(data);
		afterSave();
	};

	return (
		<DialogFormLayout initialValues={initialValues} onSubmit={onSubmit} validationSchema={jobPostingValidationSchema} formDisabled={saving}>
			<PostingForm updateLocation={setLocation} availability={availability} setAvailability={setAvailability} />
		</DialogFormLayout>
	);
};
