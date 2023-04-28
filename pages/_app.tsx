import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
interface AppPropsWithSession extends AppProps {
	session: Session;
}

export default function App({ Component, pageProps, session }: AppPropsWithSession) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
