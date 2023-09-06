import dayjs from 'dayjs';
import { WorkHistory } from './ExperienceList';
import { EditExperienceDialog } from '@components/Dialogs/EditExperience/EditExperienceDialog';
import { DeleteExperienceDialog } from '@components/Dialogs/DeleteExperience/DeleteExperienceDialog';

type ExperienceListItem = { data: WorkHistory; index: number };

const dateFormatString = (date: string) => dayjs(date, 'DD-MM-YYYY').format('MMM, YYYY');

export const ExperienceListItem = ({ data, index }: ExperienceListItem) => (
	<div className='flex flex-col border py-2 bg-slate-50 p-5 rounded'>
		<div className='flex'>
			<div className='flex flex-col pb-3 grow'>
				<h1 className='font-semibold text-lg'>{data.positionTitle}</h1>
				<h3 className='text-gray-600'>{data.companyName}</h3>
			</div>
			<div className='flex gap-3 items-start'>
				<EditExperienceDialog index={index} data={data} />
				<DeleteExperienceDialog id={index} />
			</div>
			<div className='flex gap-1'>
				{data.startDate && <p>{dateFormatString(data.startDate)}</p>}
				<p>-</p>
				{data.endDate && <p>{dateFormatString(data.endDate)}</p>}
			</div>
			<div></div>
		</div>
		<p>{data.details}</p>
	</div>
);
