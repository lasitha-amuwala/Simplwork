import React from 'react';

type Props = {};

const test = (props: Props) => {
	const DataDisplay = ({ text, value }: { text: string; value: number }) => {
		return (
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-semibold text-sw-500'>{value}</h1>
				<p className='font-medium'>{text}</p>
			</div>
		);
	};

	const JobCard = () => {
		return (
			<div className='flex flex-col gap-5 w-full max-w-2xl bg-white rounded-lg border border-gray-200 p-5'>
				<div>
					<h1 className='font-semibold text-xl'>Position Title</h1>
					<p className='font-medium text-lg'>
						Branch Name - <span className='text-gray-500'>branch location</span>
					</p>
				</div>
				<div className='flex justify-between'>
					<DataDisplay value={14} text='New' />
					<DataDisplay value={15} text='Viewed' />
					<DataDisplay value={16} text='Shortlisted' />
					<DataDisplay value={17} text='Interview Requested' />
					<DataDisplay value={18} text='Ready For Interview' />
				</div>
			</div>
		);
	};
	return (
		<div className='w-screen h-screen flex flex-col gap-5 justify-center items-center'>
			<JobCard />
			<JobCard />
			<JobCard />
			<JobCard />
		</div>
	);
};

export default test;
