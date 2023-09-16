import React, { PropsWithChildren } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { AvailabilityViewDialog } from './AvailabilityWidget/AvailabilityViewDialog';
import { ExperienceList } from './Lists/Experience/ExperienceList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SimplworkApi, queries } from '@utils/simplwork';
import { useAuth } from './Auth/AuthProvider';
import { useRouter } from 'next/router';
import { displayDistance } from '@utils/helpers';
import { CgSpinner } from 'react-icons/cg';
import Link from 'next/link';

type Props = {};

const TabBody = ({
	status,
	actionBtnText,
	newStatus,
}: {
	status: SW.Employer.Status;
	actionBtnText: string;
	newStatus: SW.Employer.Status;
}) => {
	const router = useRouter();
	const { user, employerName } = useAuth();
	const canId = parseInt(router.query.canId as string);
	const postId = parseInt(router.query.id as string);

	const {
		data: matches,
		isLoading,
		isError,
	} = useQuery(queries.employer.postings.getMatchesById(user?.credential ?? '', postId, status, {}));
	const { data: post } = useQuery(queries.employer.postings.getPostingByID(user?.credential ?? '', postId));

	const currMatch = matches?.find((match) => match.candidateProfile.id == canId);
	const queryClient = useQueryClient();

	const { mutate, isLoading: mutateIsLoading } = useMutation({
		mutationFn: ({ candidateID, postingID, newStatus }: { candidateID: number; postingID: number; newStatus: SW.Employer.Status }) =>
			SimplworkApi.post('employer/postings/status', null, { params: { candidateID, postingID, newStatus } }),
		onSuccess: () => queryClient.invalidateQueries(),
		onError: () => alert('There was an issue deleting your postings, please try again later.'),
	});

	const updateMatchStatus = (candidateID: number, postingID: number, newStatus: SW.Employer.Status) =>
		mutate({ candidateID, postingID, newStatus });

	const renderActionButton = (text: string, canId: number, postId: number, newStatus: SW.Employer.Status) => (
		<button
			disabled={mutateIsLoading}
			className='button inline-flex justify-center items-center group/button disabled:pointer-events-none'
			onClick={() => updateMatchStatus(canId, postId, newStatus)}>
			<CgSpinner className='w-5 h-5 absolute group-enabled/button:opacity-0 animate-spin ' />
			<span className='group-disabled/button:opacity-0 '>{text}</span>
		</button>
	);

	const RejectButton = () => (
		<button className='btn-red' onClick={() => updateMatchStatus(canId, postId, 'REJECTED')}>
			Reject
		</button>
	);

	if (isError) return <div>...error</div>;

	return (
		<div className='w-full flex max-h-[75vh] min-h-[55vh] gap-5'>
			{isLoading ? (
				<div className='w-full justify-center flex items-center'>
					<CgSpinner className='w-12 h-12 absolute animate-spin text-sw-500' />
				</div>
			) : isError ? (
				<div className='w-full justify-center flex items-center'>
					<h1 className='text-lg dont-medium'>Oops, Something went wrong, try again</h1>
				</div>
			) : (
				<>
					<div className='w-1/3 flex flex-col gap-2 border-r pr-3'>
						<h1 className='font-semibold text-lg px-1.5'>{`Applications (${matches.length})`}</h1>
						<ul className='flex flex-col gap-2 overflow-auto p-1.5'>
							{matches.length == 0 && <li className='flex justify-center items-center min-h-[55vh] font-medium'>No Applications.</li>}
							{matches.map((match, i) => (
								<Link
									key={`${canId}-${i}`}
									className={`flex flex-col ring-sw hover:ring rounded text-start ${match.candidateProfile.id == canId && 'ring '}`}
									href={`?${new URLSearchParams({
										...router.query,
										canId: match.candidateProfile.id,
									})}`}>
									<MatchListItem match={match} />
								</Link>
							))}
						</ul>
					</div>
					<div className='w-2/3 h-52 rounded-lg'>
						{currMatch ? (
							<div className='flex flex-col gap-5'>
								<div className='flex gap-5'>
									<div className='grow'>
										<h1 className='text-2xl font-semibold'>{currMatch.candidateProfile.candidateName}</h1>
										<h1 className='text-lg font-medium text-gray-500'>location</h1>
									</div>
									<div className='flex h-full gap-3'>
										<>{renderActionButton(actionBtnText, canId, postId, newStatus)}</>
										<RejectButton />
									</div>
								</div>
								<div>
									<h1 className='text-lg font-medium'>Contact Info</h1>
									<p className=''>
										Email: <span className='font-medium'>{currMatch.candidateProfile.email}</span>
									</p>
									<p className=''>
										Phone Number: <span className='font-medium'>{currMatch.candidateProfile.phoneNumber}</span>
									</p>
								</div>
								<AvailabilityViewDialog availability={currMatch.candidateProfile.availability} shifts={post?.shifts} />
								<ExperienceList history={currMatch.candidateProfile.workHistory} />
							</div>
						) : (
							<div className='flex justify-center items-center h-full min-h-[55vh] font-medium'>
								Choose an application to view candidate profile.
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export const PostOverviewDialogContent = ({ id }: { id: number }) => {
	return (
		<Tabs.Root className='flex flex-col' defaultValue='tab1'>
			<Tabs.List className='shrink-0 flex ' aria-label='Manage your account'>
				<TabTrigger label='New' value='tab1' />
				<TabTrigger label='Reviewed' value='tab2' />
				<TabTrigger label='Interview Requested' value='tab3' />
				<TabTrigger label='Ready For Interview' value='tab4' />
				<TabTrigger label='Rejected' value='tab5' />
			</Tabs.List>
			<TabContent value='tab1'>
				<TabBody status='NEW' actionBtnText='Request Interview' newStatus={'INTERVIEW_REQUESTED'} />
			</TabContent>
			<TabContent value='tab2'>
				<TabBody status='REVIEWED' actionBtnText='Request Interview' newStatus={'INTERVIEW_REQUESTED'} />
			</TabContent>
			<TabContent value='tab3'>
				<TabBody status='INTERVIEW_REQUESTED' actionBtnText='Ready For Interview' newStatus={'READY_FOR_INTERVIEW'} />
			</TabContent>
			<TabContent value='tab4'>
				<TabBody status='READY_FOR_INTERVIEW' actionBtnText='Ready For Interview' newStatus={'NEW'} />
			</TabContent>
			<TabContent value='tab5'>
				<TabBody status='REJECTED' actionBtnText='Ready For Interview' newStatus={'READY_FOR_INTERVIEW'} />
			</TabContent>
		</Tabs.Root>
	);
};

const TabTrigger = ({ label, value }: { label: string; value: string }) => (
	<Tabs.Trigger
		className='px-5 transition-shadow duration-150 h-[45px] flex-1 flex items-center justify-center font-normal text-base leading-none text-gray-600  select-none first:rounded-tl-md last:rounded-tr-md hover:text-black data-[state=active]:font-medium hover:cursor-pointer data-[state=active]:text-sw-500 data-[state=active]:shadow-[inset_0_-2px_0_0,0_1px_0_0] data-[state=inactive]:shadow-[inset_0_-0.5px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=inactive]:shadow-gray-200 data-[state=active]:focus:relative  outline-none cursor-default'
		value={value}>
		{label}
	</Tabs.Trigger>
);

type TabContentType = PropsWithChildren<{ value: string }>;

const TabContent = ({ value, children }: TabContentType) => {
	return (
		<Tabs.Content className='grow rounded-b-md outline-none py-5' value={value}>
			{children}
		</Tabs.Content>
	);
};

const MatchListItem = ({ match }: { match: SW.Employer.Postings.Match }) => {
	return (
		<div className='bg-white w-full border-[1.5px] rounded p-5'>
			<h1 className='font-medium text-md'>{match.candidateProfile.candidateName}</h1>
			<p className='flex items-center gap-1 text-gray-500 text-md'>location</p>
			<p className='text-ms'>
				Compatible Hours: <span>{match.matchingHours}hrs</span>
			</p>
			<p>
				Distance: <span>{displayDistance(match.distance)}</span>
			</p>
		</div>
	);
};
