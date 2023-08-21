type StepperButtonsProps = {
	step: number;
	updateStep: (arg: number) => void;
	renderBackButton?: boolean;
};

export const StepperButtons = ({ step, updateStep, renderBackButton = false }: StepperButtonsProps) => {
	return (
		<div className='flex w-full gap-3'>
			{renderBackButton && (
				<button
					type='button'
					onClick={() => updateStep(step - 1)}
					className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
					Back
				</button>
			)}
			<button
				type='submit'
				className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
				Continue
			</button>
		</div>
	);
};
