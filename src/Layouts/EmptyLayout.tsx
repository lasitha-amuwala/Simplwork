import Head from 'next/head';
import { PropsWithChildren } from 'react';

export const EmptyLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => (
	<>
		<Head>
			<title>{`${title} - Simplwork`}</title>
		</Head>
		<main>{children}</main>
	</>
);
