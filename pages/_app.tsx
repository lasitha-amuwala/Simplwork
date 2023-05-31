import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { BaseLayout } from '@/src/components/layout/BaseLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { AuthProvider } from '@/src/components/Auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface CustomAppProps extends AppProps {
	Component: NextPageWithLayout;
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: CustomAppProps) {
	const getLayout = Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
