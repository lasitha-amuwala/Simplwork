import { ProtectedPage } from '@/src/components/Auth/ProtectedPage';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const applications: NextPage = (props: Props) => {
	return (
		<ProtectedPage>
			<div>applications</div>
		</ProtectedPage>
	);
};

export default applications;
