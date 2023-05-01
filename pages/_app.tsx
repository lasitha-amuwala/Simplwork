import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { BaseLayout } from '@/src/components/layout/BaseLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';

interface CustomAppProps extends AppProps {
	session: Session;
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps, session }: CustomAppProps) {
	const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);

	return (
		<SessionProvider session={session}>
			{getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
}
