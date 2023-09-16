import { useAuth } from '@components/Auth/AuthProvider';
import { ProtectedPage } from '@components/Auth/ProtectedPage';
import { Card } from '@components/Card';
import { ProfileImage } from '@components/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@utils/simplwork';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Profile = (props: Props) => {
	const { user, employerName } = useAuth();
	const { data: employer, isLoading, isError } = useQuery(queries.employer.getEmployer(user?.credential ?? '', employerName as string));

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>error</div>;
	return (
		<ProtectedPage>
			<Head>
				<title>Employer - Simplwork</title>
			</Head>
			<div className='py-10'>
				<div className='h-auto flex x-5 gap-7 items-center justify-center pb-10'>
					<Card className='flex flex-col justify-center items-center min-w-[350px] py-10 px-10 gap-7'>
						<ProfileImage image={user?.picture} />
						{employer && (
							<div className='flex justify-center flex-col items-center '>
								<h1 className='text-4xl font-semibold'>{employer.companyName}</h1>
								<h1 className='text-lg text-gray-600'>{employer.companyDescription}</h1>
							</div>
						)}
					</Card>
				</div>
			</div>
		</ProtectedPage>
	);
};

export default Profile;
