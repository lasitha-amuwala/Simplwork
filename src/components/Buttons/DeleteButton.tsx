import { LoadingButton } from './LoadingButton';

type DeleteButtonProps = {
	text: string;
	disabled?: boolean;
	[key: string]: any;
};

export const DeleteButton = ({ text = 'Delete', disabled = false, ...rest }: DeleteButtonProps) => (
	<LoadingButton text={text} className='btn-red font-medium' disabled={disabled} {...rest} />
);
