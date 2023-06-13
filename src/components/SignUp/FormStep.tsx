import React from 'react';
import { Form, FormikConfig, FormikValues } from 'formik';
import { StepHeader } from './StepHeader';

type FormStepperProps = { step: number };

export const FormStepper = ({ children, step }: React.PropsWithChildren<FormStepperProps>) => {
	const arrayChildren = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
	const currentChild = arrayChildren[step];

	return (
		<Form noValidate>
			<div className='flex flex-col w-[450px] max-w-[450px] gap-5'>{currentChild}</div>
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

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
	className?: string;
	title: string;
	subtitle: string;
}

export const FormStep = ({ title, subtitle, children }: FormikStepProps) => (
	<>
		<StepHeader title={title} subtitle={subtitle} />
		{children}
	</>
);
