import { useAuth } from '@components/Auth/AuthProvider';
import { AvailabilityViewDialog } from '@components/AvailabilityWidget/AvailabilityViewDialog';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import parse from 'html-react-parser';

type PostBodyProps = { post: SW.PostingResponse };

export const PostBody = ({ post }: PostBodyProps) => {
	const { user } = useAuth();
	const shifts = post.posting.shifts;

	const { data: candidate, isLoading, isError } = useQuery<SW.Candidate.ICandidate>(queries.candidate.getCandidate(user?.credential ?? ''));

	let requiredMinutes = 0;
	requiredMinutes = shifts.reduce(
		(acc: number, curr: SW.IShift) => acc + (curr.shiftTimes.endTime - curr.shiftTimes.startTime),
		requiredMinutes
	);

	const requiredHours = requiredMinutes / 60;
	const data = 'lorem <b>&ampipsum</b>';

	return (
		<div className='flex flex-col gap-4 p-5'>
			<div>
				<h1 className='font-semibold text-2xl pb-2'>{post.posting.positionTitle}</h1>
				<div className='flex flex-col'>
					{post.potentialEarning && (
						<div className=' font-medium'>
							Potential earnings per week: <span className='font-bold'>${post.potentialEarning}</span>
						</div>
					)}
					{post.posting.shifts && (
						<div className=' font-medium'>
							Hours required for job: <span className='font-bold'>{requiredHours} hours</span>
						</div>
					)}
					{post.matchingHours && (
						<div className='font-medium'>
							Hours matching your availability: <span className='font-bold'>{post.matchingHours} hours</span>
						</div>
					)}
					<div className='font-medium'>
						Hourly rate:
						<span className='font-bold'> ${post.posting.pay}</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='font-semibold text-lg'>Job Description</h1>
				<div className='text-gray-500'>{parse(post.posting.jobDescription)}</div>
			</div>
			<div className='flex flex-col gap-1'>
				<h1 className='font-semibold text-lg'>Benefits</h1>
				<p className='text-gray-500'>{post.posting.benefits}</p>
			</div>
			<div className='pr-1'>
				<AvailabilityViewDialog shifts={shifts} availability={candidate?.availability} />
			</div>
		</div>
	);
};
