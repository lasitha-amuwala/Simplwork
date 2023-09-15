import { ArrayHelpers, Field, FieldArray, FormikValues } from 'formik';
import React from 'react';
import { CommuteCheckBoxButton, commuteTypes } from './CommuteCheckBox';
import { CustomErrorMessage } from '@components/CustomErrorMessage';

type Props = {
	values: FormikValues;
};

export const CommuteSelect = ({ values }: Props) => {
	return (
		<>
			<div className='flex gap-3 w-[450px] justify-between'>
				{Object.values(commuteTypes).map(({ value, text, icon }, index) => (
					<label key={`${text}${index}`}>
						<Field type='checkbox' name='commuteTypes' value={value} label={text} icon={icon} component={CommuteCheckBoxButton} />
					</label>
				))}
			</div>
			<FieldArray
				name='maxTravelTimes'
				render={(arrayHelpers: ArrayHelpers) => (
					<div className='flex flex-col gap-5'>
						{values.commuteTypes &&
							values.commuteTypes.length > 0 &&
							values.commuteTypes.map((commuteType: string, index: number) => (
								<div key={index}>
									<label className='flex flex-row gap-5 items-center w-full justify-between'>
										<span className='font-medium'>Maximum commute time by {commuteTypes[commuteType].text}</span>
										<Field type='number' min={0} max={100000} name={`maxTravelTimes.${commuteType}`} placeholder='min' className='inputStyle w-20' />
									</label>
									<CustomErrorMessage name={`maxTravelTimes.${commuteType}`} />
								</div>
							))}
					</div>
				)}
			/>
		</>
	);
};
