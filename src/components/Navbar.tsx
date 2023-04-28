import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
	return (
		<div className='flex justify-center h-16 bg-white w-full overflow-hidden border-b border-neutral-200 px-5'>
			<div className='flex h-full w-full max-w-7xl items-center justify-between'>
				<div>
					<img src='/Logo-long.svg' alt='Simplwork logo' />
				</div>
				<div className='flex gap-10 font-medium'>
					<div>
						<a>Find Jobs</a>
					</div>
					<div>
						<a>Applications</a>
					</div>
					<div>
						<a>Profile</a>
					</div>
				</div>
				{session ? (
					<Popover.Root>
						<Popover.Trigger asChild>
							<Avatar.Root className='h-12 w-12 overflow-hidden rounded-full'>
								<Avatar.Image className='w-full h-full object-cover rounded-full' src={session.user.image} alt={session.user.name} />
							</Avatar.Root>
						</Popover.Trigger>{' '}
						<Popover.Portal>
							<Popover.Content className='PopoverContent' sideOffset={5}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
									<button onClick={() => signOut()}>Sign Out</button>
								</div>
								<Popover.Close className='PopoverClose' aria-label='Close'>
									<Cross2Icon />
								</Popover.Close>
								<Popover.Arrow className='PopoverArrow' />
							</Popover.Content>
						</Popover.Portal>
					</Popover.Root>
				) : (
					<button onClick={() => signIn()}>Sign In</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
