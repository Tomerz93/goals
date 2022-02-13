import React from 'react';
import '../styles/globals.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Layout } from '@components/UI';
import AuthCheck from '@components/AuthCheck/AuthCheck';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const Noop: React.FC = ({ children }) => <>{children}</>;
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const AppLayout = (Component as any).Layout || Layout;
  const Provider = (Component as any).Provider ?? Noop;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider>
            <AppLayout>
              <Provider>
                {Component.isProtected ? (
                  <AuthCheck>
                    <Component {...pageProps} />
                  </AuthCheck>
                ) : (
                  <Component {...pageProps} />
                )}
              </Provider>
            </AppLayout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
