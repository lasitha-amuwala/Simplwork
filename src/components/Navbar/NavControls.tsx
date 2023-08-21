import { useAuth } from '../Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { queries } from '../../utils/simplwork';
import * as Popover from '@radix-ui/react-popover';
import * as Avatar from '@radix-ui/react-avatar';
import { RxCross2 } from 'react-icons/rx';
import { getInitials } from '../../utils/helpers';
import { SignInButton } from './SignInButton';
import { LogoutButton } from './SignOutButton';

export const NavControls = () => {
	const { user } = useAuth();

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				{user ? (
					<Avatar.Root className='h-11 w-11 overflow-hidden rounded-full'>
						{user?.picture ? (
							<Avatar.Image asChild className='w-full h-full object-cover rounded-full' src={user.picture} alt={user?.name} />
						) : (
							<Avatar.Fallback className='text-sw-500 leading-1 flex h-full w-full items-center justify-center bg-sw-50 text-[15px] font-medium'>
								{getInitials(user?.name)}
							</Avatar.Fallback>
						)}
					</Avatar.Root>
				) : (
					<SignInButton />
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
