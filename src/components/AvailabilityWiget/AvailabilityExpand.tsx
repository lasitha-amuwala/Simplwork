import { useState } from 'react';
import { CandaidateAvailibility } from '@/src/types/api/candidate';
import { DialogContentLayout } from '../Dialogs/DialogContentLayout';
import { renderWidget } from './AvailabilityWidget';

type Props = {
	availability: CandaidateAvailibility;
};

export const AvailabilityExpand = ({ availability }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='flex flex-col gap-5'>
			<div className='h-[400px] overflow-y-auto pr-1'>{renderWidget({ readonly: true, availability })}</div>
			<div className='self-end'>
				<DialogContentLayout open={open} setOpen={setOpen} title='View Availability' description='' triggerLabel='Expand'>
					<div className='h-full'>{renderWidget({ readonly: true, availability })}</div>
				</DialogContentLayout>
			</div>
		</div>
	);
};
