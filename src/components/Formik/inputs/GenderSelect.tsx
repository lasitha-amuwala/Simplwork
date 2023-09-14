import { FieldControl } from './FieldControl';

type Props = {};

export const GenderSelect = (props: Props) => {
	return (
		<FieldControl as='select' name='gender' label='Gender' type='' errorBelow>
			<option value='' label='Select a gender'></option>
			<option value='MALE'>Male</option>
			<option value='FEMALE'>Female</option>
		</FieldControl>
	);
};
