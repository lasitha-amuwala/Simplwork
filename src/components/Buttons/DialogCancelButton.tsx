import { DialogClose } from '../Dialogs/Dialog';

export const DialogCancelButton = () => (
	<DialogClose aria-label='Close' asChild>
		<button type='button' className='button' aria-label='Close'>
			Cancel
		</button>
	</DialogClose>
);
