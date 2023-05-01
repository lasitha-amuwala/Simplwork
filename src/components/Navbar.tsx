import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { signIn, signOut } from 'next-auth/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
	let session = null
	// const nameSplit = session?.user.name.split(' ');

	return (
		<nav className="flex justify-center h-16 bg-white w-full overflow-hidden border-b border-neutral-200 px-5 fixed z-[9999] left-0 right-0" >
			<div className="flex h-full w-full max-w-7xl items-center justify-between">
				<div>
					<img src="/Logo-long.svg" alt="Simplwork logo" />
				</div>
				<ul className="flex gap-10 font-medium">
					<li>
						<Link className='text-neutral-500 hover:text-neutral-800' href='/jobs'>Find Jobs</Link>
					</li>
					<li >
						<Link className='text-neutral-500 hover:text-neutral-800' href="/applications">Applications</Link>
					</li>
					<li>
						<Link className='text-neutral-500 hover:text-neutral-800' href="/profile">Profile</Link>
					</li>
				</ul>
				{session ? (
					<Popover.Root>
						{/* <Popover.Trigger asChild>
							<Avatar.Root className="h-12 w-12 overflow-hidden rounded-full">
								<Avatar.Image
									className="w-full h-full object-cover rounded-full"
									src={session?.user.image}
									alt={session?.user.name}
								/>
								<Avatar.Fallback
									className="h-12 w-12 flex items-center justify-center font-medium border border-neutral-300 bg-sky-500/20 rounded-full text-sky-600 tracking-wider"
									delayMs={600}
								>{`${nameSplit[0][0]} ${nameSplit[1][0]}`}</Avatar.Fallback>
							</Avatar.Root>
						</Popover.Trigger>{' '}
						<Popover.Portal>
							<Popover.Content className="PopoverContent" sideOffset={5}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
									<button onClick={() => signOut()}>Sign Out</button>
								</div>
								<Popover.Close className="PopoverClose" aria-label="Close">
									<Cross2Icon />
								</Popover.Close>
								<Popover.Arrow className="PopoverArrow" />
							</Popover.Content>
						</Popover.Portal> */}
					</Popover.Root>
				) : (
					<div className='flex gap-3 tranistion-all duration-300'>
						<Link
							href='/signin'
							className='bg-sky-500 px-3 py-1 rounded text-white font-medium hover:bg-sky-400'
						>Sign in
						</Link>
						<Link
							href='/signup' 
							className='bg-black px-3 py-1 rounded text-white font-medium'	
						>Sign up
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
