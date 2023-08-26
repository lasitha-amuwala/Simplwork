import React from 'react';
import { AvailabilityWidget } from '@components/AvailabilityWidget/NewAvailabilityWidget/AvailabilityWidget';

type Props = {};

const Test = (props: Props) => {
	return (
		<>
			<div className='p-10 w-1/2 h-[50vh]'>
				<AvailabilityWidget />
			</div>
		</>
	);
};

export default Test;
