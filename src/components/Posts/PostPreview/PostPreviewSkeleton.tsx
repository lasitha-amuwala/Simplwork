import { Card } from '@components/Card';

export const PostPreviewSkeleton = () => (
	<Card className='grid grid-cols-12 p-4 gap-3 animate-pulse'>
		<div className='w-full col-span-12 grid grid-cols-12'>
			<div className='col-span-7 w-full grid grid-cols-10 gap-2'>
				<div className='h-5 bg-gray-300 rounded col-span-7'></div>
				<div className='h-5 bg-gray-300 rounded col-span-4 col-start-1'></div>
			</div>
			<div className='h-7 bg-gray-300 rounded col-span-2 col-start-11'></div>
		</div>
		<div className='h-9 bg-gray-300 rounded-full col-span-3 col-start-1'></div>
		<div className='h-9 bg-gray-300 rounded-full col-span-3'></div>
		<div className='h-9 bg-gray-300 rounded-full col-span-3'></div>
		<div className='h-12 w-full col-span-12 grid grid-cols-12 justify-center items-center'>
			<div className='h-[75%] bg-gray-300 rounded col-span-12'></div>
			<div className='h-[75%] bg-gray-300 rounded col-span-12'></div>
		</div>
		<div className='h-4 bg-gray-300 rounded col-span-3'></div>
	</Card>
);
