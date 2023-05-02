import React, { ReactElement } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { EmptyLayout } from '@/src/components/layout/EmptyLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';

const SignIn: NextPageWithLayout = () => (
	<div className='flex flex-col items-center md:bg-white h-auto p-10 rounded-xl md:border border-neural-200'>
		<div className='bg-[#64B1EC] bg-opacity-[22%] p-3 rounded-lg'>
			<Image src='./icon.svg' alt='icon' width={45} height={45}></Image>
		</div>
		<h3 className='text-2xl pt-3'>Welcome Back</h3>
		<p className='pt-1 pb-5'>Please login to continue</p>
		<button onClick={() => signIn('google', { callbackUrl: '/' })} className='cursor-pointer'>
			<div className='flex border border-neutral-400 py-2 px-4 rounded-lg w-[300px] items-center justify-center'>
				<Image src='./google.svg' alt='google' width={25} height={25}></Image>
				<h1 className='pl-7 text-lg flex-grow text-center font-medium'>Sign in with Google</h1>
			</div>
		</button>
	</div>
);

export const getServerSideProps = async (context: any) => {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (session) {
		return {
			redirect: {
				destination: '/',
			},
		};
	}

	return { props: { session } };
};

SignIn.getLayout = function getLayout(page: ReactElement) {
	return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
