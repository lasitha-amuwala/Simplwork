import { useState } from 'react';
import { CandaidateAvailibility } from '@/src/types/api/candidate';
import { DialogContentLayout } from '../Dialogs/DialogContentLayout';
import { AvailabilityWidget, AvailabilityWidgetProps } from './AvailabilityWidget';

type Props = {
	availability: CandaidateAvailibility;
};

export const ViewAvailability = ({ availability }: Props) => {
	const [open, setOpen] = useState(false);

	const renderWidget = (props: AvailabilityWidgetProps): JSX.Element => <AvailabilityWidget {...props} />;

	return (
		<div className='flex flex-col gap-5'>
			<div className='self-end'>
				<DialogContentLayout
					open={open}
					setOpen={setOpen}
					triggerLabel='Expand'
					description=''
					title='View Availability'>
					<div className='h-full'>{renderWidget({})}</div>
				</DialogContentLayout>
			</div>
			<div className='h-[400px] overflow-y-auto pr-1'>{renderWidget({ readonly: true, availability })}</div>
		</div>
	);
};
