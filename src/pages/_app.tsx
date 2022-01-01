import '../styles/globals.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@lib/context/auth';
import { Layout } from '@components/UI';
import AuthCheck from '@components/AuthCheck/AuthCheck';
import { UserProvider } from '@lib/context/user';
const MyApp = ({ Component, pageProps }: AppProps) => {
  const AppLayout = (Component as any).Layout || Layout;
  return (
    <AuthProvider>
      <UserProvider>
        <AppLayout>
          <AuthCheck>
            <Component {...pageProps} />
          </AuthCheck>
        </AppLayout>
      </UserProvider>
    </AuthProvider>
  );
};

export default MyApp;
