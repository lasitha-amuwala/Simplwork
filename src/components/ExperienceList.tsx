import React from 'react';
import { ExperienceListItem } from './ExperienceListItem';

export type WorkHistory = {
	positionTitle: string;
	companyName: string;
	details: string;
	startDate?: string;
	endDate?: string;
};

type WorkExperienceListProps = { history: WorkHistory[] };

export const WorkExperienceList = ({ history }: WorkExperienceListProps) => {
	return (
		<div>
			{history.length === 0 ? (
				<div className='bg-gray-50 w-full py-10 px-5 mt-5 flex flex-col justify-center items-center'>
					<p className=''>No work history to display.</p>
					<p>
						Click <span className='font-semibold'>Add Experience</span> to add your work history.
					</p>
				</div>
			) : (
				history.map((data, i) => <ExperienceListItem key={i} data={data} index={i} />)
			)}
		</div>
	);
};
