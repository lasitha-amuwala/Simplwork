import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextPage } from 'next';
import Image from 'next/image';

const signin: NextPage = () => {
	const { data: session } = useSession();

	// if (session) {
	// 	return (
	// 		<div>
	// 			<p>You are logged in {session.user?.email}</p>
	//     <img src={session.user?.image as string}></img>
	// 			<button onClick={() => signOut()}>Sign Out</button>
	// 		</div>
	// 	);
	// }
	// return (
	// 	<div>
	// 		<p>You are not signed in</p>
	// 		<button onClick={() => signIn()}>Sign In</button>
	// 	</div>
	// );

	return (
		<div className='flex flex-col items-center w-96 bg-white h-auto py-10 rounded-xl border border-neural-200'>
			<div className='bg-[#64B1EC] bg-opacity-[22%] p-3 rounded-lg'><Image src='./icon.svg' alt='icon' width={45} height={45}></Image></div>
			<h3 className='text-2xl pt-5'>Welcome</h3>
			<p className='pt-1 pb-5'>Please login to continue</p>
			<button onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/' })} className='cursor-pointer'><div className='flex border-2 border-neutral-400 py-3 px-4 rounded-lg w-[300px] items-center justify-center'><Image src='./google.svg' alt='google' width={30} height={30}></Image><h1 className='pl-7 flex-grow text-center font-medium'>Sign in with Google</h1></div></button>
		</div>
	)
};

export default signin;
