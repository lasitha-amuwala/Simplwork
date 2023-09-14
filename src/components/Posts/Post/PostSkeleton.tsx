import { Card } from "@components/Card";

export const PostSkeleton = () => (
	<Card className='bg-white rounded-md border border-gray-200 animate-pulse mt-1'>
		<div className=' grid grid-cols-12 gap-3'>
			<div className='h-20 w-20 bg-gray-300 rounded col-span-2 row-span-2' />
			<div className='h-5 bg-gray-300 rounded col-span-7' />
			<div className='h-4 bg-gray-300 rounded col-span-6' />
		</div>
		<div className='gap-3 grid grid-cols-12'>
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
	</Card>
);
