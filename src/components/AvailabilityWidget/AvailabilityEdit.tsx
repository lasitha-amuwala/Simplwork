import { useState } from 'react';
import { DialogContentLayout } from '../Dialogs/DialogContentLayout';
import { SaveChangesButton } from '../Buttons/SaveChangesButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCandidate } from '@utils/simplwork';
import { DialogCancelButton } from '../Dialogs/DialogCancelButton';
import { convertAvailabilityToShifts, convertShiftsToEvents } from './NewAvailabilityWidget/logic';
import { AvailabilityWidget } from './NewAvailabilityWidget/AvailabilityWidget';

type Props = {
	availability: SW.IAvailability;
};

export const AvailabilityEdit = ({ availability }: Props) => {
	const [open, setOpen] = useState(false);
	console.log(availability);

	return (
		<div className='flex flex-col gap-3'>
			<div className='h-[400px] overflow-y-auto pr-1'>
				<AvailabilityWidget events={convertShiftsToEvents(convertAvailabilityToShifts(availability), false)} readonly />
			</div>
			<div className='self-end'>
				<DialogContentLayout
					open={open}
					setOpen={setOpen}
					title='Edit'
					description={`Click Save Changes when you're done.`}
					triggerLabel='Edit Availability'>
					<EditAvialabilityDialogBody afterSave={() => setOpen(false)} availability={availability} />
				</DialogContentLayout>
			</div>
		</div>
	);
};

const EditAvialabilityDialogBody = ({ afterSave, availability }: { afterSave: () => void; availability: SW.IAvailability }) => {
	const queryClient = useQueryClient();
	const [buttonDiabled, setButtonDiabled] = useState(false);
	const [availabilityObj, setAvailabilityObj] = useState<SW.IAvailability>(availability);
	console.log(availabilityObj);

	const { mutate } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => {
			alert('There was an issue updating your availability, please try again later.');
		},
	});

	const onSave = () => {
		setButtonDiabled(true);
		mutate([{ op: 'replace', path: `/candidateProfile/availability`, value: availabilityObj }]);
		afterSave();
	};

	return (
		<fieldset className='group' disabled={buttonDiabled}>
			<form onSubmit={onSave}>
				<div className='h-full py-5 w-[50vw]'>
					<AvailabilityWidget events={convertShiftsToEvents(convertAvailabilityToShifts(availability), false)} onChange={setAvailabilityObj} />
				</div>
				<div className='flex w-full justify-end gap-3'>
					<DialogCancelButton />
					<SaveChangesButton />
				</div>
			</form>
		</fieldset>
	);
};
