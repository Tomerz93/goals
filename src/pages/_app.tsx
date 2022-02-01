import '../styles/globals.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@lib/context/auth';
import { Layout } from '@components/UI';
import AuthCheck from '@components/AuthCheck/AuthCheck';
import { UserProvider } from '@lib/context/user';
import { SessionProvider } from 'next-auth/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const Noop: React.FC = ({ children }) => <>{children}</>;
const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const AppLayout = (Component as any).Layout || Layout;
  const Provider = (Component as any).Provider ?? Noop;
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <AppLayout>
                <Provider>
                  {/* <AuthCheck> */}
                  <Component {...pageProps} />
                  {/* </AuthCheck> */}
                </Provider>
              </AppLayout>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
