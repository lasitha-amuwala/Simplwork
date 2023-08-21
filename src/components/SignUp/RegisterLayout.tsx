import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { StepProgressHeader, StepProgressHeaderObj } from './StepProgressHeader';

type RegisterLayoutProps = { step: number; stepProgressHeaders: StepProgressHeaderObj[] };

export const RegisterLayout = ({ step, stepProgressHeaders, children }: PropsWithChildren<RegisterLayoutProps>) => {
	return (
		<div className='flex w-full h-screen bg-white p-5 over'>
			<div className='bg-gray-100 items-start rounded-xl w-1/3 min-w-[450px] px-7 py-10 overflow-hidden hidden md:block'>
				<div className='pb-8'>
					<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
				</div>
				<div className='flex flex-col gap-6'>
					{stepProgressHeaders.map(({ name, description, stepId }, i) => (
						<StepProgressHeader key={`${name}-${i}`} name={name} description={description} stepId={stepId} currStep={step} />
					))}
				</div>
			</div>
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>{children}</div>
		</div>
	);
};
