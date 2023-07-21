import { useState } from 'react';
import { useAuth } from './Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { queries } from '../utils/simplwork';
import * as Popover from '@radix-ui/react-popover';
import * as Avatar from '@radix-ui/react-avatar';
import { RxCross2 } from 'react-icons/rx';
import { RiMenuFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { getInitials } from '../utils/helpers';
import Link from 'next/link';
import Image from 'next/image';

const LogoutButton = () => {
	const { signOut } = useAuth();
	return (
		<button className='button' onClick={signOut}>
			Sign Out
		</button>
	);
};

const SigninButton = () => {
	return (
		<Link href='/' className='bg-sw-700 px-2 md:px-3 py-1 rounded text-white font-medium hover:bg-sky-400 active:bg-sky-300 '>
			Sign in
		</Link>
	);
};

const NavControls = () => {
	const { user } = useAuth();
	const { data: candidate } = useQuery(queries.candidate.getCandidate(user?.credential ?? ''));

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				{candidate ? (
					<Avatar.Root className='h-11 w-11 overflow-hidden rounded-full'>
						{candidate.picture ? (
							<Avatar.Image asChild className='w-full h-full object-cover rounded-full' src={user?.picture} alt={candidate.candidateName} />
						) : (
							<Avatar.Fallback className='text-sw-500 leading-1 flex h-full w-full items-center justify-center bg-sw-50 text-[15px] font-medium'>
								{getInitials(candidate?.candidateName)}
							</Avatar.Fallback>
						)}
					</Avatar.Root>
				) : (
					<SigninButton />
				)}
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className='PopoverContent' sideOffset={5}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						<LogoutButton />
					</div>
					<Popover.Close className='PopoverClose' aria-label='Close'>
						<RxCross2 />
					</Popover.Close>
					<Popover.Arrow className='PopoverArrow' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { pathname } = useRouter();

	const navlinks = [
		{ name: 'Find Jobs', href: '/' },
		{ name: 'My Applications', href: '/applications' },
		{ name: 'Profile', href: '/profile' },
	];

	return (
		<nav className='flex justify-center h-[var(--header-height)] bg-white w-full border-b border-neutral-200 px-2 md:px-5 fixed left-0 right-0'>
			<div className='flex h-full w-full max-w-[1300px] items-center justify-between'>
				<div className='md:hidden'>
					<button
						onClick={() => setOpen(!open)}
						className='rounded-full hover:bg-neutral-100 active:bg-neutral-200 p-3 transition-all duration-150 cursor-pointer'>
						<RiMenuFill className='h-6 w-6' />
					</button>
					{open && (
						<div className='absolute top-[var(--header-height)] left-0 right-0 w-full h-auto bg-white'>
							<ul>
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
