import React from 'react';
import Navbar from '../Navbar';

type Props = {
    children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center min-h-screen h-screen w-full pt-[var(--header-height)]">
                <div className='max-w-7xl'>
                {children}
                </div>
            </main>
        </>
    );
};
