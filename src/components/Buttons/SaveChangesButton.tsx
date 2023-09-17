import { LoadingButton } from './LoadingButton';

type SaveChangeButtonProps = {
	disabled?: boolean;
};

export const SaveChangesButton = ({ disabled = false }: SaveChangeButtonProps) => {
	return (
		<LoadingButton
			type='submit'
			text='Save Changes'
			className='bg-green-100 text-green-700 font-medium hover:bg-green-200 active:bg-green-100'
			disabled={disabled}
		/>
	);
};
