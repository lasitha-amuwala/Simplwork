import React, { useState } from 'react';
import { DialogContentLayout } from '../Dialogs/DialogContentLayout';
import { AvailabilityWidget, AvailabilityWidgetProps } from './AvailabilityWidget';
import { CandaidateAvailibility } from '@/src/types/api/candidate';

type Props = {
	availability: CandaidateAvailibility;
};

export const EditAvailability = ({ availability }: Props) => {
	const [open, setOpen] = useState(false);

	const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;

	return (
		<div className='flex flex-col gap-5'>
			<div className='self-end'>
				<DialogContentLayout
					open={open}
					setOpen={setOpen}
					triggerLabel='Edit Availability'
					title='Edit Availability'
					description={`Select the times that you are available to work. Click Save Changes when you're done`}>
					<div className='h-full'>{renderWidget({})}</div>
				</DialogContentLayout>
			</div>
			<div className='h-[400px] overflow-y-auto pr-1'>{renderWidget({ readonly: true, availability })}</div>
		</div>
	);
};
