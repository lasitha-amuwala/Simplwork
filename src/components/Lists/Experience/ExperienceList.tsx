import { Card } from '@components/Card';
import { ExperienceListItem } from './ExperienceListItem';

export type WorkHistory = {
	positionTitle: string;
	companyName: string;
	details: string;
	startDate?: string;
	endDate?: string;
};

type ExperienceListProps = { history: WorkHistory[]; renderButtons: boolean };

export const ExperienceList = ({ history, renderButtons }: ExperienceListProps) => {
	return (
		<>
			{history.length === 0 ? (
				<Card className='bg-gray-200 w-full py-10 px-5 flex flex-col justify-center items-center'>
					<p>No work history to display.</p>
					<p>
						Click <span className='font-semibold'>Add Experience</span> to add your work history.
					</p>
				</Card>
			) : (
				<div className='flex flex-col gap-3'>
					{history.map((data, i) => (
						<ExperienceListItem key={i} data={data} index={i} renderButtons={renderButtons} />
					))}
				</div>
			)}
		</>
	);
};
