import { useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { NavControls } from './NavControls';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { pathname } = useRouter();

	const navlinks = [
		{ name: 'Find Jobs', href: '/' },
		{ name: 'My Applications', href: '/applications' },
		{ name: 'Profile', href: '/profile' },
	];

	return (
		<nav className='flex justify-center h-[var(--header-height)] bg-white w-full border-b border-neutral-200 px-2 md:px-5 fixed left-0 right-0 z-50'>
			<div className='flex h-full w-full max-w-[1300px] items-center justify-between'>
				<div className='md:hidden'>
					<button
						onClick={() => setOpen(!open)}
						className='rounded-full hover:bg-neutral-100 active:bg-neutral-200 p-3 transition-all duration-150 cursor-pointer'>
						<RiMenuFill className='h-6 w-6' />
					</button>
					{open && (
						<div className='absolute top-[var(--header-height)] left-0 right-0 w-full h-auto bg-white'>
							<ul className=''>
								{navlinks.map((link) => (
									<li key={link.name} className='pl-6 p-2 border-b text-base font-medium'>
										<Link className='text-gray-500 hover:text-gray-800' href={link.href} onClick={() => setOpen(false)}>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<Link href='/'>
					<Image src='/Logo-long.svg' alt='Simplwork logo' width={120} height={29.13} />
				</Link>
				<div className='hidden md:block h-full'>
					<ul className='flex gap-10 font-medium h-full'>
						{navlinks.map((link) => (
							<li key={link.name} className='h-full items-center flex flex-col border-sky-500'>
								<div className='grow flex items-center'>
									<Link
										className={`${pathname === link.href ? 'text-sky-500 hover:text-sky-600' : 'text-gray-500 hover:text-neutral-800'} `}
										href={link.href}>
										{link.name}
									</Link>
								</div>
								<div className={`${pathname === link.href ? 'visible' : 'invisible'} bg-sky-500 h-[3px] w-14 rounded-t-2xl`}></div>
							</li>
						))}
					</ul>
				</div>
				<NavControls />
			</div>
		</nav>
	);
};

export default Navbar;
