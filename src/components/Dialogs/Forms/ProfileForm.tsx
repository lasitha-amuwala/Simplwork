import { FieldControl } from '../../FieldControl';
import { GenderSelect } from '../../GenderSelect';

export const ProfileForm = () => (
	<div className='flex flex-col gap-2 my-5'>
		<FieldControl name='fullName' label='Name' type='text' />
		<div className='flex gap-5'>
			<FieldControl name='age' label='Age' type='number' min={14} max={100} errorBelow />
			<GenderSelect />
		</div>
		<FieldControl name='phoneNumber' label='Phone Number' type='tel' placeholder='XXX-XXX-XXXX' />
	</div>
);
