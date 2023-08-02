import { DialogClose } from './Dialog';

export const DialogCancelButton = () => (
	<DialogClose aria-label='Close' asChild>
		<button type='button' className='button' aria-label='Close'>
			Cancel
		</button>
	</DialogClose>
);
