import { useRouter } from 'next/router';
import { MdErrorOutline } from 'react-icons/md';

export const ErrorTryAgain = () => {
  const router = useRouter()
	return (
		<div className='flex flex-col gap-3 w-full h-[50vh] justify-center items-center text-gray-600'>
			<MdErrorOutline className='text-6xl' />
			<h1 className='text-2xl font-medium'>An Error Occured</h1>
			<button className='button' onClick={() => router.reload()}>
				Try again
			</button>
		</div>
	);
};
