import React from 'react';

type Props = {
	postData: any;
};

export const JobPost = ({ postData }: Props) => {
	return (
		<div className='h-auto bg-white rounded-md border border-gray-200 mt-1 sticky top-[72px] overflow-hidden'>
			<div className='h-28 bg-[#64B1EC]/10 flex items-center p-4 gap-4'>
				<div className='h-20 w-20 bg-blue-300 rounded-md'></div>
				<div className='h-full'>
					<h1 className='font-semibold text-xl'>{postData.posting.employer.companyName}</h1>
					<p>{postData.posting.employer.companyDescription}</p>
				</div>
			</div>
			<div className='p-5 flex flex-col gap-2'>
				<h1 className='font-semibold text-lg'>Job Description</h1>
				<p className='text-gray-500'>{postData.posting.jobDescription}</p>
			</div>
		</div>
	);
};

export const JobPostSkeleton = () => (
	<div className='bg-white rounded-md border border-gray-200 animate-pulse mt-1'>
		<div className='p-4 grid grid-cols-12 gap-3'>
			<div className='h-20 w-20 bg-gray-300 rounded col-span-2 row-span-2' />
			<div className='h-5 bg-gray-300 rounded col-span-7' />
			<div className='h-4 bg-gray-300 rounded col-span-6' />
		</div>
		<div className='p-4 gap-3 grid grid-cols-12'>
			<div className='h-4 bg-gray-300 rounded col-span-4 col-start-1' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
			<div className='h-2 bg-gray-300 rounded col-span-12' />
		</div>
	</div>
);
