import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { BaseLayout } from '@/src/components/layout/BaseLayout';
import { NextPageWithLayout } from '@/src/types/NextPageWithLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/src/components/Auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface CustomAppProps extends AppProps {
	Component: NextPageWithLayout;
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: CustomAppProps) {
	const getLayout = Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<GoogleOAuthProvider clientId='869487513689-u4hhunj2o95cf404asivk737j91fddgq.apps.googleusercontent.com'>
					{getLayout(<Component {...pageProps} />)}
				</GoogleOAuthProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
