import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { BaseLayout } from '@/src/layouts/BaseLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { AuthProvider } from '@/src/components/Auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface CustomAppProps extends AppProps {
	Component: NextPageWithLayout;
}

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: CustomAppProps) {
	const getLayout = Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<main className={inter.className}>{getLayout(<Component {...pageProps} />)}</main>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
