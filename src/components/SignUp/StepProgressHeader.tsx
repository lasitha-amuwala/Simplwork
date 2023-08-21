import { CgCheckO } from 'react-icons/cg';

type StepProgressHeaderProps = {
	name: string;
	description: string;
	stepId: number;
	currStep: number;
};

export type StepProgressHeaderObj = Pick<StepProgressHeaderProps, 'name' | 'description' | 'stepId'>;

export const StepProgressHeader = ({ name, description, stepId, currStep }: StepProgressHeaderProps) => {
	const titleColor = currStep === stepId ? 'text-black' : 'text-neutral-500';
	const descColor = currStep === stepId ? 'text-neutral-700' : 'text-neutral-500';
	const iconColor = currStep === stepId ? 'text-[#64B1EC]' : currStep > stepId ? 'text-[#64B1EC]/50' : 'text-neutral-400';

	return (
		<div className='flex gap-3'>
			<CgCheckO className={`${iconColor} w-7 h-7 mt-1 shrink-0`} />
			<div className='flex flex-col gap-1'>
				<h1 className={`${titleColor} font-semibold text-lg tracking-wide	 `}>{name}</h1>
				<p className={`${descColor} text-base font-normal leading-5`}>{description}</p>
			</div>
		</div>
	);
};
