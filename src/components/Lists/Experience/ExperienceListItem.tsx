import dayjs from 'dayjs';
import { WorkHistory } from './ExperienceList';
import { EditExperienceDialog } from '@components/Dialogs/EditExperience/EditExperienceDialog';
import { DeleteExperienceDialog } from '@components/Dialogs/DeleteExperience/DeleteExperienceDialog';
import { Card } from '@components/Card';

type ExperienceListItem = { data: WorkHistory; index: number };

const dateFormatString = (date: string) => dayjs(date, 'DD-MM-YYYY').format('MMM, YYYY');

export const ExperienceListItem = ({ data, index }: ExperienceListItem) => (
	<Card className='bg-gray-50 rounded flex flex-col py-2  p-5 '>
		<div className='flex'>
			<div className='flex flex-col pb-3 grow'>
				<h1 className='font-semibold text-lg'>{data.positionTitle}</h1>
				<h3 className='text-gray-600'>{data.companyName}</h3>
			</div>
			<div className='flex gap-5'>
				<p>
					{data.startDate && <span>{dateFormatString(data.startDate)}</span>} - {data.endDate && <span>{dateFormatString(data.endDate)}</span>}
				</p>
				<div className='flex gap-3 items-start'>
					<EditExperienceDialog index={index} data={data} />
					<DeleteExperienceDialog id={index} />
				</div>
			</div>
		</div>
		<p>{data.details}</p>
	</Card>
);
