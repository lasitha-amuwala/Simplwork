import { PropsWithChildren, ReactElement, Children } from 'react';
import { Form, FormikConfig, FormikValues } from 'formik';
import { StepHeader } from './StepHeader';

type StepperProps = { step: number; updateStep: (step: number) => void };

export const Stepper = ({ children, step, updateStep }: PropsWithChildren<StepperProps>) => {
	const arrayChildren = Children.toArray(children) as ReactElement<StepProps>[];
	const currentChild = arrayChildren[step];

	return <div className='flex flex-col w-[450px] max-w-[450px] gap-5'>{currentChild}</div>;
};

export interface StepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
	className?: string;
	title: string;
	subtitle: string;
}

// export const Step = ({ title, subtitle, children }: StepProps) => (
// 	<>
// 		<StepHeader title={title} subtitle={subtitle} />
// 		{children}
// 	</>
// );
