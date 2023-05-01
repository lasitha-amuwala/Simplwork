import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/src/components/Navbar';
import * as Avatar from '@radix-ui/react-avatar';
import { getServerSession } from 'next-auth/next';
import * as Popover from '@radix-ui/react-popover';

import { authOptions } from './api/auth/[...nextauth]';
import { signIn, signOut } from 'next-auth/react';
import { Cross2Icon } from '@radix-ui/react-icons';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
    session: any;
}

const Home = ({ session }: HomeProps) => {
    console.log(session);


    return (
        <div className="flex min-h-screen w-full h-screen flex-col items-center">
            
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    return { props: { session } };
};

export default Home;
