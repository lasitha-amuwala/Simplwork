import { CgSpinner } from 'react-icons/cg';

type SaveChangeButtonProps = {
	disabled?: boolean;
};

export const SaveChangesButton = ({ disabled = false }: SaveChangeButtonProps) => {
	return (
		<button
			type='submit'
			disabled={disabled}
			className='inline-flex justify-center items-center group bg-green-100 py-2 px-3 rounded text-green-700 font-medium hover:bg-green-200 disabled:pointer-events-none group-disabled:pointer-events-none'>
			<CgSpinner className='w-5 h-5 absolute group-enabled:opacity-0 animate-spin' />
			<span className='group-disabled:opacity-0'>Save Changes</span>
		</button>
	);
};
