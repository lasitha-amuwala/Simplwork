import Image from 'next/image';
import { useState } from 'react';
import { CgCheckO } from 'react-icons/cg';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Checkbox from '@radix-ui/react-checkbox';
import { RxCheck } from 'react-icons/rx';
import * as Yup from 'yup';

const StepHeader = ({ name, description, stepId, currStep }: { name: string; description: string; stepId: number; currStep: number }) => {
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

const InputControl = ({ name, label }: { name: string; label: string }) => {
	return (
		<div>
			<div className='flex items-baseline justify-between'>
				<label className='font-medium leading-[35px]' htmlFor={name}>
					{label}
				</label>
				<ErrorMessage name={name} className='opacity-[0.8]' />
			</div>
			<Field
				type='text'
				name={name}
				required
				className='inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px]  focus:shadow-[0_0_0_2px_black]'></Field>
		</div>
	);
};
export const SignUpFlow = () => {
	const [step, setStep] = useState(0);

	const initialValues = {
		firstName: '',
		LastName: '',
		age: '',
		gender: '',
		phone: '',
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter your first name'),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
		age: Yup.number().required().positive().integer(),
		phone: Yup.number().required(),
	});
	const onSubmit = () => {};

	return (
		<>
			<div className='flex w-full h-full bg-white p-5'>
				<div className='bg-gray-100 titems-start rounded-xl w-1/3 min-w-[450px] px-7 py-10 overflow-hidden'>
					<div className='pb-8'>
						<Image src='/Logo-long.svg' alt='logo' width={145} height={30} />
					</div>
					<div className='flex flex-col gap-6'>
						<StepHeader name='Create profile' description='Please select the account type that you wish to create' stepId={1} currStep={step} />
						<StepHeader name='Add Work Availability' description='Please add your work availability' stepId={2} currStep={step} />
						<StepHeader
							name='Add Work Experience'
							description='Please select the account type that you wish to create'
							stepId={3}
							currStep={step}
						/>
					</div>
				</div>
				<div className='flex flex-col w-full h-full gap-3 items-center justify-center'>
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
						{({ errors }) => (
							<Form>
								<div className='flex flex-col gap-5 w-[350px] max-w-[350px]'>
									<div>
										<h3 className='text-2xl pt-3 font-medium text-center'>Create Profile</h3>
										<p className='pt-1 pb-2 text-center'>Enter your information to create your profile</p>
									</div>
									<InputControl name='firstName' label='First name' />
									<InputControl name='lastName' label='Last name' />
									<div className='flex w-full gap-10'>
										<InputControl name='age' label='Age' />
										<InputControl name='gender' label='Gender' />
									</div>
									<InputControl name='phone' label='Phone number' />

									<div className='flex items-center'>
										<Checkbox.Root
											className='flex bg-neutral-200 h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] outline-none cursor-pointer'
											id='c1'>
											<Checkbox.Indicator>
												<RxCheck />
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label className='pl-[15px] text-[15px] leading-none text-black font-medium' htmlFor='c1'>
											I am legally allowed to work in Canada.
										</label>
									</div>
									<div className='flex gap-3 w-full '>
										<button className='w-1/2 bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80'>
											Back
										</button>
										<button
											type='submit'
											className='w-1/2 bg-[#64B1EC] p-3 text-white font-medium text-center items-center rounded-[4px] cursor-pointer hover:bg-[#64b1ec]/90 active:bg-[#64b1ec]/80'>
											Continue
										</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
					<button
						onClick={() => {
							setStep(step + 1);
						}}>
						Up
					</button>
					<button
						onClick={() => {
							setStep(step - 1);
						}}>
						Down
					</button>
					<Formik initialValues={initialValues} onSubmit={() => {}}></Formik>
				</div>
			</div>
		</>
	);
};
