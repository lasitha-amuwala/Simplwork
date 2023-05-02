import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const GoogleButton = ({ text }: { text: string }) => {
	return (
		<button onClick={() => signIn('google', { callbackUrl: '/' })} className='cursor-pointer bg-white'>
			<div className='flex border border-neutral-400 py-2 px-4 rounded-lg w-[300px] items-center justify-center'>
				<Image src='./google.svg' alt='google' width={25} height={25}></Image>
				<h1 className='pl-7 text-lg flex-grow text-center font-medium'>{`${text} with Google`}</h1>
			</div>
		</button>
	);
};
