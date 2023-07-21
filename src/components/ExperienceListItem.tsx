import { DeleteExperienceDialog } from './Dialogs/DeleteExperienceDialog';
import { EditExperienceDialog } from './Dialogs/EditExperienceDialog';
import { WorkHistory } from './ExperienceList';

type ExperienceListItem = { data: WorkHistory; index: number };

export const ExperienceListItem = ({ data, index }: ExperienceListItem) => (
	<div className='flex flex-col border py-2 bg-slate-50 p-5 rounded'>
		<div className='flex'>
			<div className='flex flex-col pb-3 grow'>
				<h1 className='font-semibold text-lg'>{data.positionTitle}</h1>
				<h3 className='text-gray-600'>{data.companyName}</h3>
			</div>
			<div className='flex gap-3 items-start'>
				<EditExperienceDialog index={index} data={data} />
				<DeleteExperienceDialog index={index} data={data} />
			</div>
			<p></p>
		</div>
		<p>{data.details}</p>
	</div>
);
