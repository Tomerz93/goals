import '../styles/globals.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@lib/context/auth';
import { Layout } from '@components/UI';
import AuthCheck from '@components/AuthCheck/AuthCheck';
import { UserProvider } from '@lib/context/user';

const Noop: React.FC = ({ children }) => <>{children}</>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const AppLayout = (Component as any).Layout || Layout;
  const Provider = (Component as any).Provider ?? Noop;
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <AppLayout>
            <Provider>
              <AuthCheck>
                <Component {...pageProps} />
              </AuthCheck>
            </Provider>
          </AppLayout>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
