import '../styles/globals.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@lib/context';
import { Layout } from '@components/UI';
import AuthCheck from '@components/AuthCheck/AuthCheck';
const MyApp = ({ Component, pageProps }: AppProps) => {
  const AppLayout = (Component as any).Layout || Layout;
  return (
    <AuthProvider>
      <AppLayout>
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
      </AppLayout>
    </AuthProvider>
  );
};

export default MyApp;
