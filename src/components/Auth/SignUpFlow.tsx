import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { CgCheckO } from 'react-icons/cg';
import { ErrorMessage, Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import * as Yup from 'yup';
import AutoComplete from '../AutoComplete';
import { CandaidateProfile } from '@/src/types/api/candidate';

const StepProgressHeader = ({
	name,
	description,
	stepId,
	currStep,
}: {
	name: string;
	description: string;
	stepId: number;
	currStep: number;
}) => {
	const titleColor = currStep === stepId ? 'text-black' : 'text-neutral-500';
	const descColor = currStep === stepId ? 'text-neutral-700' : 'text-neutral-500';
	const iconColor = currStep === stepId ? 'text-[#64B1EC]' : currStep > stepId ? 'text-[#64B1EC]/50' : 'text-neutral-400';

	return (
		<div className='flex gap-3'>
			<CgCheckO className={`${iconColor} w-7 h-7 mt-1 shrink-0`} />
			<div className='flex flex-col gap-1'>
				<h1 className={`${titleColor} font-semibold text-lg tracking-wide	 `}>{name}</h1>
				<p className={`${descColor} text-base font-normal leading-5`}>{description}</p>
			</div>
		</div>
	);
};

const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
	return (
		<div>
			<h3 className='text-2xl pt-3 font-medium text-center'>{title}</h3>
			<p className='pt-1 pb-2 text-center font-medium opacity-70'>{subtitle}</p>
		</div>
	);
};

type InputControlProps = {
	name: string;
	label: string;
	errorAbove?: boolean;
};

const InputControl = ({ name, label, errorAbove }: InputControlProps) => {
	const errorMsgStyle = 'text-sm font-medium text-red-700';
	return (
		<div className=''>
			<div className='flex items-baseline justify-between'>
				<label className='font-medium leading-[35px]' htmlFor={name}>
					{label}
				</label>
				{errorAbove && <ErrorMessage name={name} render={(msg) => <p className={errorMsgStyle}>{msg}</p>} />}
			</div>
			<Field
				type='text'
				name={name}
				required
				className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'
			/>
			{!errorAbove && <ErrorMessage name={name} render={(msg) => <p className={errorMsgStyle}>{msg}</p>} />}
		</div>
	);
};

type ValueTypes = {
	firstName: string;
	lastName: string;
	age?: number;
	gender: string;
	phoneNumber: string;
	location: string;
	minimumHours: number;
};

export const SignUpFlow = () => {
	const [step, setStep] = useState(0);

	const initialValues: ValueTypes = {
		firstName: '',
		lastName: '',
		gender: '',
		phoneNumber: '',
		location: '',
		minimumHours: 0,
	};

	const validationSchemaStepOne = Yup.object().shape({
		firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter your first name'),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter your last name'),
		age: Yup.number().min(14, 'You must be at least 14 years old.').required('Please enter your age').positive().integer(),
		gender: Yup.string().required('Please enter your gender'),
		phoneNumber: Yup.number().required('Please enter your phone number'),
	});

	const validationSchemaStepTwo = Yup.object().shape({
		homeAddress: Yup.string(),
		minimumHours: Yup.number().min(0, 'Please enter a valid age').max(150, 'Please enter a valid age').required('You must enter this field.'),
	});

	const validationSchema = [validationSchemaStepOne, validationSchemaStepTwo];

	const onSubmit = (values: FormikValues) => {
		if (step === 1) {
			const candidateProfile: CandaidateProfile = {
				workHistory: [],
				minimumPay: 0,
				minimumHours: values.minimumHours,
				location: { latitude: 0, longitude: 0, postalCode: 'string' },
				maxLiftWeight: 0,
				autoMatch: true,
			};

			alert(values);
		} else {
			setStep((step) => step + 1);
		}
	};

	return (
		<div className='flex w-full h-full bg-white p-5'>
			<div className='bg-gray-100 titems-start rounded-xl w-1/3 min-w-[450px] px-7 py-10 overflow-hidden'>
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
			<div className='flex flex-col w-full h-full gap-3 items-center justify-center'>
				<Formik initialValues={initialValues} onSubmit={(v) => onSubmit(v)} validationSchema={validationSchema[step]}>
					{({ values, setFieldValue }) => (
						<FormStepper step={step}>
							{/* <FormStep>
								<StepHeader title='Create Profile' subtitle='Enter your details to create a profile' />
								<InputControl name='firstName' label='First name' errorAbove />
								<InputControl name='lastName' label='Last name' errorAbove />
								<div className='flex w-full gap-5'>
									<InputControl name='age' label='Age' />
									<InputControl name='gender' label='Gender' />
								</div>
								<InputControl name='phoneNumber' label='Phone Number' errorAbove />
							</FormStep> */}
							<FormStep>
								<StepHeader title='Add Work Availability' subtitle='Enter your details to create a profile' />
								<AutoComplete />
								<div className='flex flex-col gap-1'>
									<div className='flex items-center'>
										<label className='font-medium leading-[35px]' htmlFor='minimumHours'>
											I can work up to
										</label>
										<div className='px-2 w-14'>
											<Field
												type='text'
												name='minimumHours'
												required
												className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'
											/>
										</div>
										<label className='font-medium leading-[35px]'>hours per week</label>
									</div>
									<ErrorMessage name='minimumHours' render={(msg) => <p className='text-sm font-medium text-red-700'>{msg}</p>} />
								</div>
							</FormStep>
							{/* <FormStep >
								<StepHeader title='Add Experience' subtitle='Add your work experience' />
								<div className='w-full bg-black h-28 rounded-[4px]'>

								</div>
								<button className=' bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
									Add work experience
								</button>
							</FormStep> */}
						</FormStepper>
					)}
				</Formik>
			</div>
		</div>
	);
};

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
	className?: string;
}

const FormStep = ({ children }: FormikStepProps) => <>{children}</>;

const FormStepper = ({ children, step }: React.PropsWithChildren<{ step: number }>) => {
	const arrayChildren = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
	const currentChild = arrayChildren[step];

	return (
		<Form noValidate>
			<div className='flex flex-col gap-5 w-[350px] max-w-[350px]'>{currentChild}</div>
			<div className='flex w-full pt-7 gap-3'>
				<button
					type='submit'
					className='w-full bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80 disabled:bg-gray-300'>
					Continue
				</button>
			</div>
		</Form>
	);
};
