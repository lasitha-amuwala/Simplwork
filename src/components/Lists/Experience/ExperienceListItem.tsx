import dayjs from 'dayjs';
import { WorkHistory } from './ExperienceList';
import { EditExperienceDialog } from '@components/Dialogs/Experience/ExperienceEditDialog';
import { ExperienceDeleteDialog } from '@components/Dialogs/Experience/ExperienceDeleteDialog';
import { Card } from '@components/Card';

type ExperienceListItem = { data: WorkHistory; index: number; renderButtons: boolean };

const dateFormatString = (date: string) => dayjs(date, 'DD-MM-YYYY').format('MMMM YYYY');

export const ExperienceListItem = ({ data, index, renderButtons }: ExperienceListItem) => (
	<Card className='flex flex-col py-2 p-5 '>
		<div className='flex'>
			<div className='flex flex-col pb-3 grow'>
				<h1 className='font-semibold'>{data.positionTitle}</h1>
				<h3 className='text-gray-600'>{data.companyName}</h3>
				<p>
					{data.startDate && <span>{dateFormatString(data.startDate)}</span>} - {data.endDate && <span>{dateFormatString(data.endDate)}</span>}
				</p>
			</div>
			{renderButtons && (
				<div className='flex gap-3 items-start'>
					<EditExperienceDialog index={index} data={data} />
					<ExperienceDeleteDialog id={index} />
				</div>
			)}
		</div>
		<p className='line-clamp-2'>{data.details}</p>
	</Card>
);
