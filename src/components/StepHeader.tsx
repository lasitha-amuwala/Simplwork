type StepHeader = { title: string; subtitle: string };

export const StepHeader = ({ title, subtitle }: StepHeader) => {
	return (
		<div>
			<h3 className='text-2xl pt-3 font-medium text-center'>{title}</h3>
			<p className='pt-1 pb-2 text-center font-medium opacity-70'>{subtitle}</p>
		</div>
	);
};
