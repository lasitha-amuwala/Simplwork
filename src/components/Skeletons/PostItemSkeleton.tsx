export const PostItemSkeleton = () => (
	<div className='bg-white rounded-md border border-gray-200 p-4 grid grid-cols-12 gap-3 animate-pulse'>
		<div className='h-[50px] w-[50px] bg-gray-300 rounded col-span-2 row-span-2'></div>
		<div className='h-5 bg-gray-300 rounded col-span-7'></div>
		<div className='h-4 bg-gray-300 rounded col-span-6'></div>
		<div className='h-9 bg-gray-300 rounded-full col-span-2 col-start-1'></div>
		<div className='h-9 bg-gray-300 rounded-full col-span-2'></div>
		<div className='h-9 bg-gray-300 rounded-full col-span-2'></div>
		<div className='h-3 bg-gray-300 rounded col-span-12'></div>
		<div className='h-3 bg-gray-300 rounded col-span-12'></div>
		<div className='h-2 bg-gray-300 rounded col-span-3'></div>
	</div>
);
