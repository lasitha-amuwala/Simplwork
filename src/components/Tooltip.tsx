import * as TooltipRx from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export const Tooltip =  ({ content, trigger }: { content: ReactNode; trigger: ReactNode }) => (
	<TooltipRx.Provider delayDuration={100}>
		<TooltipRx.Root>
			<TooltipRx.Trigger>{trigger}</TooltipRx.Trigger>
			<TooltipRx.Portal>
				<TooltipRx.Content className='z-[100] bg-slate-100 rounded p-2 max-w-xs border-2 align-middle'>
					{content}
					{/* <TooltipRx.Arrow /> */}
				</TooltipRx.Content>
			</TooltipRx.Portal>
		</TooltipRx.Root>
	</TooltipRx.Provider>
);
