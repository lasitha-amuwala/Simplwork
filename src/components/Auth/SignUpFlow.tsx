import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { ErrorMessage, Field, FieldArray, FieldProps, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import AutoComplete from '../AutoComplete';
import { WorkExperience } from '../WorkExperience';
import { StepProgressHeader } from '../StepProgressHeader';
import { FieldControl } from '../FieldControl';
import { FormStep, FormStepper } from '../FormStep';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdTrain, MdDirectionsCar, MdDirectionsBike, MdDirectionsWalk } from 'react-icons/md';
import 'yup-phone-lite';

type ValueTypes = {
	firstName: string;
	lastName: string;
	age: number | string;
	gender: string;
	phoneNumber: string;
	location: string;
	minimumHours: number | string;
	// publicTransit: number | string;
	// walk: number | string;
	// bicycle: number | string;
	// vehicle: number | string;
	commuteTypes: string[];
	commuteTimes: { [key: string]: number | null };
};

export const SignUpFlow = () => {
	const [step, setStep] = useState(0);

	const initialValues: ValueTypes = {
		firstName: '',
		lastName: '',
		gender: '',
		age: '',
		phoneNumber: '',
		location: '',
		minimumHours: '',
		commuteTypes: [],
		commuteTimes: {},
	};

	const validationSchemaStepOne = Yup.object().shape({
		// firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
		// lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
		// age: Yup.number().min(14, 'You must be at least 14 years').max(60, 'You must be at most 60 years').required('Age is required'),
		// gender: Yup.string().required('Gender is required'),
		// phoneNumber: Yup.string().phone(['CA', 'US'], 'Please enter a valid phone number').required('A phone number is required'),
	});

	const validationSchemaStepTwo = Yup.object().shape({
		// homeAddress: Yup.string(),
		// minimumHours: Yup.number().min(0, 'Please enter a valid age').max(150, 'Please enter a valid age').required('You must enter this field.'),
	});

	const validationSchema = [validationSchemaStepOne, validationSchemaStepTwo];

	const onSubmit = (values: FormikValues) => {
		if (step === 2) {
			// const candidateProfile: CandaidateProfile = {
			// 	workHistory: [],
			// 	minimumPay: 0,
			// 	minimumHours: values.minimumHours,
			// 	location: { latitude: 0, longitude: 0, postalCode: 'string' },
			// 	maxLiftWeight: 0,
			// 	autoMatch: true,
			// };
			// alert(values);
		} else {
			setStep((step) => step + 1);
		}
	};

	return (
		<div className='flex w-full h-full bg-white p-5'>
			<div className='bg-gray-100 titems-start rounded-xl w-1/3 min-w-[450px] px-7 py-10 overflow-hidden hidden md:block'>
				<div className='pb-8'>
					<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
				</div>
				<div className='flex flex-col gap-6'>
					<StepProgressHeader
						name='Create Profile'
						description='Please select the account type that you wish to create'
						stepId={0}
						currStep={step}
					/>
					<StepProgressHeader name='Add Availability' description='Please add your work availability' stepId={1} currStep={step} />
					<StepProgressHeader
						name='Add Work Experience'
						description='Please select the account type that you wish to create'
						stepId={2}
						currStep={step}
					/>
				</div>
			</div>
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center p-10'>
				<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)} validationSchema={validationSchema[step]}>
					{({ values, setFieldValue }) => (
						<FormStepper step={step}>
							<FormStep title='Create Profile' subtitle='Enter your details to create a profile'>
								<FieldControl name='firstName' label='First name' type='fname' />
								<FieldControl name='lastName' label='Last name' type='lname' />
								<div className='flex w-full gap-5'>
									<FieldControl name='age' label='Age' type='number' min={14} max={60} errorBelow />
									<FieldControl name='gender' label='Gender' type='text' errorBelow />
								</div>
								<FieldControl name='phoneNumber' label='Phone Number' type='tel' />
							</FormStep>

							<FormStep title='Add Work Availability' subtitle='Enter your details to create a profile'>
								<AutoComplete />
								<div className='flex flex-col gap-1'>
									<div className='flex items-center'>
										<label className='font-medium leading-[35px]' htmlFor='minimumHours'>
											I can work up to
										</label>
										<div className='px-2 w-20'>
											<Field type='number' name='minimumHours' required className='inputStyle' />
										</div>
										<label className='font-medium leading-[35px]'>hours per week</label>
									</div>
									<ErrorMessage name='minimumHours' render={(msg) => <p className='text-sm font-medium text-red-700'>{msg}</p>} />
								</div>
								<h1 className='text-md pt-3 font-medium'>
									Select the methods of transportation that apply to you, and enter the maximum amount of time for each.
								</h1>
								<div className='flex gap-3 w-[450px] justify-between'>
									{Object.values(commuteTypes).map(({ value, text, icon }) => (
										<label>
											<Field type='checkbox' name='commuteTypes' value={value} label={text} icon={icon} component={CommuteCheckBoxButton} />
										</label>
									))}
								</div>

								<FieldArray
									name='commuteTimes'
									render={(arrayHelpers) => (
										<div className='flex flex-col gap-5'>
											{values.commuteTypes &&
												values.commuteTypes.length > 0 &&
												values.commuteTypes.map((commuteType, index) => (
													<div key={index}>
														<label className='flex flex-row gap-5 items-center w-full justify-between'>
															<span className='font-medium'>Maximum commute time by {commuteTypes[commuteType].text}</span>
															<Field type='number' min={0} name={`commuteTimes.${commuteType}`} placeholder='km' className='inputStyle w-20' />
														</label>
													</div>
												))}
										</div>
									)}
								/>
								{JSON.stringify(values, null, 2)}
							</FormStep>

							<FormStep title='Add Experience' subtitle='Add your work experience'>
								<WorkExperience />
								<button className='text-base bg-black p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-black/90 active:bg-black/80 disabled:bg-gray-300'>
									<span className='flex gap-2 items-center'>
										<HiOutlinePlus className='text-xl' />
										<p className='tracking-wide'>Add Work Experience</p>
									</span>
								</button>
							</FormStep>
						</FormStepper>
					)}
				</Formik>
			</div>
		</div>
	);
};
const commuteTypes: { [key: string]: { text: string; value: string; icon: React.ReactNode } } = {
	VEHICLE: { text: 'Vehicle', value: 'VEHICLE', icon: <MdDirectionsCar /> },
	WALK: { text: 'Walking', value: 'WALK', icon: <MdDirectionsWalk /> },
	BICYCLE: { text: 'Bicyle', value: 'BICYCLE', icon: <MdDirectionsBike /> },
	PUBLIC_TRANSIT: { text: 'Transit', value: 'PUBLIC_TRANSIT', icon: <MdTrain /> },
};

interface CommuteCheckBoxButtonProps extends FieldProps {
	label: string;
	icon: React.ReactNode;
	value: string;
}

const CommuteCheckBoxButton = ({ field, form, label, icon, value, ...props }: CommuteCheckBoxButtonProps) => {
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
