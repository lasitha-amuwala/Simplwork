import DialogContent, { Dialog } from '@components/Dialogs/Dialog';
import { MatchStatusList } from '@components/Applications/MatchStatusList';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import { useAuth } from '@components/Auth/AuthProvider';
import Head from 'next/head';

type Props = {};

const Applications: NextPage = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();
	const { user } = useAuth();

	const { data } = useQuery(queries.candidate.getCandidatePostings(user?.credential as string, {}));

	const renderPostDialog = (): JSX.Element => {
		return <>{/* <Post post={} /> */}</>;
	};

	useEffect(() => {
		if (router.query.id) {
			router.query.id;
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [router]);

	return (
		<ProtectedPage>
			<Head>
				<title>My Applications - Simplwork</title>
			</Head>
			<div className='w-full h-full py-10'>
				<div className='flex flex-col gap-10'>
					<MatchStatusList status='APPLIED' label='Applied' />
					<MatchStatusList status='ACCEPT_INTERVIEW' label='Interviews' />
					<MatchStatusList status='WITHDRAWN' label='Withdrawn' />
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>{renderPostDialog()}</DialogContent>
			</Dialog>
		</ProtectedPage>
	);
};

export default Applications;
