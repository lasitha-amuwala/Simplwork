import { AvailabilityExpand } from '@components/AvailabilityWidget';

type PostBodyProps = { post: SW.PostingResponse };

export const PostBody = ({ post }: PostBodyProps) => {
	const availability = post.posting.shifts;

	let requiredMinutes = 0;
	requiredMinutes = availability.reduce(
		(acc: number, curr: SW.IShift) => acc + (curr.shiftTimes.endTime - curr.shiftTimes.startTime),
		requiredMinutes
	);

	const requiredHours = requiredMinutes / 60;

	return (
		<div className='flex flex-col gap-5 p-5'>
			<div className='flex flex-col gap-1'>
				{post.potentialEarning && (
					<div className='text-xl font-medium'>
						Potential earnings per week: <span className='font-bold'>${post.potentialEarning}</span>
					</div>
				)}
				{post.posting.shifts && (
					<div className='text-xl font-medium'>
						Hours required for job: <span className='font-bold'>{requiredHours} hours</span>
					</div>
				)}
				{post.matchingHours && (
					<div className='text-xl font-medium'>
						Hours matching your availability: <span className='font-bold'>{post.matchingHours} hours</span>
					</div>
				)}
				<div className='text-lg font-medium'>
					Hourly Rate:
					<span className='font-bold'> ${post.posting.pay}</span>
				</div>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='font-semibold text-lg'>Job Description</h1>
				<p className='text-gray-500'>{post.posting.jobDescription}</p>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='font-semibold text-lg'>Benefits</h1>
				<p className='text-gray-500'>{post.posting.benefits}</p>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='font-semibold text-lg'>Availability</h1>
				<div className='pr-1'>
					<AvailabilityExpand availability={availability} />
				</div>
			</div>
		</div>
	);
};
