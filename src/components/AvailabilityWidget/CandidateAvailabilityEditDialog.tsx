import React from 'react';
import { AvailabilityEditDialog } from './AvailabilityEditDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCandidate } from '@utils/simplwork';
import { convertShiftsToAvailability } from './logic';

type Props = {
	availability: SW.IAvailability;
};

export const CandidateAvailabilityEditDialog = ({ availability }: Props) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation({
		mutationFn: patchCandidate,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidate'] }),
		onError: () => alert('There was an issue updating your availability, please try again later.'),
	});

	const onSave = (shifts: SW.IShift[]) => {
		mutate([{ op: 'replace', path: `/candidateProfile/availability`, value: convertShiftsToAvailability(shifts) }]);
	};

	return <AvailabilityEditDialog onSave={onSave} isLoading={isLoading} availability={availability} />;
};
