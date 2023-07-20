import dayjs from 'dayjs';
import relativeTIme from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
require('dayjs/locale/en-ca');

dayjs.extend(relativeTIme);
dayjs.extend(customParseFormat);
dayjs.locale('en-ca');

type PostedDateProps = { date: string };

export const PostedDate = ({ date }: PostedDateProps) => {
	return (
		<div className='text-xs pt-3 text-gray-500 flex gap-1'>
			<p>{dayjs(date, 'DD-MM-YYYY', 'en-ca').format('MMMM D, YYYY').toString()}</p>
			{/* {' • '}
			<p>{dayjs(date, 'DD-MM-YYYY', 'en-ca').fromNow()}</p> */}
		</div>
	);
};
