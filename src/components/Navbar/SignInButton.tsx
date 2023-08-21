import Link from 'next/link';

export const SignInButton = () => {
	return (
		<Link href='/' className='bg-sw-700 px-2 md:px-3 py-1 rounded text-white font-medium hover:bg-sky-400 active:bg-sky-300 '>
			Sign in
		</Link>
	);
};
