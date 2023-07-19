import { memo } from 'react';
import { PostTag } from './PostTag';
import { MdAttachMoney, MdCalendarMonth, MdOutlineAccessTime } from 'react-icons/md';
import { PostedDate } from './PostedDate';

type PostListItemProps = {
	post: any;
	status: string;
	active?: boolean;
};

type CharsOfWeekArray = { day: string; available: boolean }[];

const AvailableDayOfWeek = (weekAvailability: { dayOfWeek: number }[]) => {
	const days = weekAvailability.map(({ dayOfWeek }) => dayOfWeek);
	const charsOfWeek: CharsOfWeekArray = [
		{ day: 'M', available: false },
		{ day: 'T', available: false },
		{ day: 'W', available: false },
		{ day: 'T', available: false },
		{ day: 'F', available: false },
		{ day: 'S', available: false },
		{ day: 'S', available: false },
	];

	days.forEach((num: number) => (charsOfWeek[num - 1].available = true));
	charsOfWeek.unshift(charsOfWeek.pop()!);

	return (
		<div className='flex gap-0.5 font-medium text-gray-700'>
			{charsOfWeek.map(({ day, available }, i) => (
				<p key={`${i}${day}`} className={`${available && 'text-sw-300 font-bold'}`}>
					{day}
				</p>
			))}
		</div>
	);
};

export const PostListItem = ({ post, status, active }: PostListItemProps) => {
	return (
		<div
			className={`w-full h-auto  bg-white rounded-md border border-gray-200 p-4 text-start ring-sw hover:ring transition-shadow duration-150 ${
				active && 'ring'
			}`}>
			<div className='w-full flex flex-col gap-3 overflow-hidden'>
				<div className='flex gap-4'>
					{/* <div className='w-[50px] h-[50px] bg-sky-300 rounded-md'></div> */}
					<div className='flex flex-col flex-grow'>
						<h5 className='font-semibold'>{post.positionTitle}</h5>
						<p className='font-medium text-gray-500'>{post.employer.companyName}</p>
					</div>
					<div className=''>
						{status && status === 'APPLIED' ? (
							<div className='bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-md'>Applied</div>
						) : (
							<button className='bg-sw-50 text-sw-400 text-sm font-medium px-2 py-1 rounded-md text-now whitespace-nowrap'>Click to apply</button>
						)}
					</div>
				</div>
				<div className='flex gap-2 w-full flex-wrap'>
					{post.pay && <PostTag icon={<MdAttachMoney />}>{`$${post.pay}/hr`}</PostTag>}
					{post.shifts.length > 0 && <PostTag icon={<MdCalendarMonth />}>{AvailableDayOfWeek(post.shifts)}</PostTag>}
					{!post.isFixedSchedule && post.estimatedHours >= 0 && <PostTag icon={<MdOutlineAccessTime />}>{`${post.estimatedHours} hrs`}</PostTag>}
				</div>
				<p className='w-full text-gray-600 line-clamp-2'>{post.jobDescription}</p>
			</div>
			<PostedDate date={post.createdAt} />
		</div>
	);
};

export const MemoizedPostListItem = memo(PostListItem);
