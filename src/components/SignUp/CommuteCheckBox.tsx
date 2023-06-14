import { FieldProps } from 'formik';
import { MdDirectionsBike, MdDirectionsCar, MdDirectionsWalk, MdTrain } from 'react-icons/md';

export const commuteTypes: { [key: string]: { text: string; value: string; icon: React.ReactNode } } = {
	CAR: { text: 'Driving', value: 'CAR', icon: <MdDirectionsCar /> },
	WALK: { text: 'Walking', value: 'WALK', icon: <MdDirectionsWalk /> },
	BICYCLE: { text: 'Cycling', value: 'BIKE', icon: <MdDirectionsBike /> },
	PUBLIC_TRANSIT: { text: 'Transit', value: 'PUBLIC_TRANSIT', icon: <MdTrain /> },
};

interface CommuteCheckBoxButtonProps extends FieldProps {
	label: string;
	icon: React.ReactNode;
	value: string;
}

export const CommuteCheckBoxButton = ({ field, form, label, icon, value, ...props }: CommuteCheckBoxButtonProps) => {
	const isSelected = form.values.commuteTypes.includes(value);
	return (
		<div
			className={`inline-flex w-full  ${
				isSelected ? 'bg-sky-100 shadow-sky-200' : 'bg-white shadow-zinc-300'
			} shadow-[0_0_0_1.5px] hover:shadow-[0_0_0_3px] w-auto p-3 h-10 hover:shadow-sky-200 cursor-pointer select-none rounded-md flex items-center gap-2`}>
			<input className='hidden' {...field} value={value} {...props} type='checkbox' />
			<div className={`${isSelected ? 'text-sky-500' : 'text-black'}`}>{icon}</div>
			<span className={`${isSelected ? 'text-sky-500 ' : 'text-black'} font-medium`}>{label}</span>
		</div>
	);
};
