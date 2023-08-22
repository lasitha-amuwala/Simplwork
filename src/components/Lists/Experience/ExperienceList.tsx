import { ExperienceListItem } from './ExperienceListItem';

export type WorkHistory = {
	positionTitle: string;
	companyName: string;
	details: string;
	startDate?: string;
	endDate?: string;
};

type ExperienceListProps = { history: WorkHistory[] };

export const ExperienceList = ({ history }: ExperienceListProps) => {
	return (
		<div className='max-h-[800px] overflow-y-auto'>
			{history.length === 0 ? (
				<div className='bg-gray-50 w-full py-10 px-5 flex flex-col justify-center items-center'>
					<p className=''>No work history to display.</p>
					<p>
						Click <span className='font-semibold'>Add Experience</span> to add your work history.
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-3 pr-3'>
					{history.map((data, i) => (
						<ExperienceListItem key={i} data={data} index={i} />
					))}
				</div>
			)}
		</div>
	);
};
