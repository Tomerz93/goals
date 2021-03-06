import { useEffect } from 'react';
import { useWithAuthContext } from '@lib/context/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AUTH_ROUTES } from '@lib/routes';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(AUTH_ROUTES.LOGIN);
  }, []);

  const { user } = useWithAuthContext();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? (
        <p>Hello {JSON.stringify(user, null, 4)}</p>
      ) : (
        <p>Hello stranger</p>
      )}
    </div>
  );
};

export default Home;
