import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export default ({ content, trigger }: { content: ReactNode; trigger: ReactNode }) => (
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>{trigger}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content className='z-[100] bg-slate-100 rounded p-2 max-w-xs border-2 align-middle'>
					{content}
					<Tooltip.Arrow />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	</Tooltip.Provider>
);
