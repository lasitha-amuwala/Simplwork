import React, { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { useSession, signOut } from 'next-auth/react';
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router'

type Props = {};

const NavControls = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className='flex gap-2 md:gap-3 tranistion-all duration-300'>
				<Link href='/signin' className='bg-sky-500 px-2 md:px-3 py-1 rounded text-white font-medium hover:bg-sky-400 active:bg-sky-300 '>
					Sign in
				</Link>
				<Link href='/signup' className='bg-black px-2 md:px-3 py-1  rounded text-white font-medium hover:bg-neutral-800 active:bg-neutral-700'>
					Sign up
				</Link>
			</div>
		);
	}

	const { user } = session;
	const name = user?.name as string | undefined;
	const image = user?.image as string | undefined;
	const nameSplit = name?.split(' ') ?? '';

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Avatar.Root className='h-11 w-11 overflow-hidden rounded-full'>
					<Avatar.Image className='w-full h-full object-cover rounded-full' src={image} alt={name} />
					<Avatar.Fallback
						className='h-11 w-11 flex items-center justify-center font-medium border border-neutral-300 bg-sky-500/20 rounded-full text-sky-600 tracking-wider'
						delayMs={600}>{`${nameSplit[0][0]} ${nameSplit[1][0]}`}</Avatar.Fallback>
				</Avatar.Root>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className='PopoverContent' sideOffset={5}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						<button
							className='bg-black px-3 py-1 rounded text-white font-medium w-auto text-center cursor-pointer hover:bg-neutral-800 active:bg-neutral-700'
							onClick={() => signOut()}>
							Sign Out
						</button>
					</div>
					<Popover.Close className='PopoverClose' aria-label='Close'>
						<Cross2Icon />
					</Popover.Close>
					<Popover.Arrow className='PopoverArrow' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

const Navbar = () => {
	const [open, setOpen] = useState(false);
  const router = useRouter();

	const navlinks = [
		{ name: 'Find Jobs', href: '/jobs' },
		{ name: 'My Applications', href: '/applications' },
		{ name: 'Profile', href: '/profile' },
	];

	return (
		<nav className='flex justify-center h-16 bg-white w-full border-b border-neutral-200 px-2 md:px-5 fixed z-[9999] left-0 right-0'>
			<div className='flex h-full w-full max-w-7xl items-center justify-between'>
				<div className='md:hidden'>
					<button
						onClick={() => setOpen(!open)}
						className='rounded-full hover:bg-neutral-100 active:bg-neutral-200 p-3 transition-all duration-150 cursor-pointer'>
						<HamburgerMenuIcon className='h-6 w-6' />
					</button>
					{open && (
						<div className='absolute top-[var(--header-height)] left-0 right-0 w-full h-auto bg-white'>
							<ul>
								{navlinks.map((link) => (
									<li className='pl-6 p-2 border-b text-base font-medium'>
										<Link className='text-neutral-600 hover:text-neutral-800' href={link.href} onClick={() => setOpen(false)}>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div>
					<img src='/Logo-long.svg' alt='Simplwork logo' />
				</div>
				<div className='hidden md:block'>
					<ul className='flex gap-10 font-medium'>
						{navlinks.map((link) => (
							<li>
								<Link className='text-neutral-600 hover:text-neutral-800' href={link.href}>
									{link.name}
								</Link>
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
