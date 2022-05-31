/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Head from 'next/head';
// import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@app/material-ui/theme';
import createEmotionCache from '@app/material-ui/createEmotionCache';
import '../styles/globals.css';
import { DataContextProvider } from '@app/global-context/DataContext';
import Layout from '@app/layout/Layout';
import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from '@app/global-context/AuthContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
// 	emotionCache?: EmotionCache;
// }

export default function MyApp(props: any) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps: { session, ...pageProps },
	} = props;
	const AppLayout = Component?.Layout || Layout;

	return (
		<>
			<CacheProvider value={emotionCache}>
				<Head>
					<title>Shadamon</title>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					<SessionProvider session={session}>
						<AuthContextProvider>
							<DataContextProvider>
								<AppLayout>
									{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
									<CssBaseline />
									<Component {...pageProps} />
								</AppLayout>
							</DataContextProvider>
						</AuthContextProvider>
					</SessionProvider>
				</ThemeProvider>
			</CacheProvider>
		</>
	);
}
