import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { BsGoogle } from 'react-icons/bs';
import { Button, LayoutWithoutHeader } from '@components/UI';

import { GOALS_ROUTES, USER_ROUTES } from '@lib/routes';
import styles from './Login.module.scss';
import type { NextPageWithLayout } from '@lib/modals/generic';
import { getProviders, signIn, getSession } from 'next-auth/react';

const Login: NextPageWithLayout = ({ providers }) => {
  const router = useRouter();
  const handleOnLogin = async () => {
    try {
      await signIn(providers.id);
    } catch (error) {
      console.log(error);
    }
    router.push(USER_ROUTES.USER_CREATE);
  };
  return (
    <section className={styles.loginContainer}>
      <div className={styles.greeting}>
        <h4>Welcome,</h4>
        <h4>We hope you will enjoy your time here</h4>
      </div>
      <div
        className={`${styles.buttonContainer} flex align-center justify-center`}
      >
        <Button handleOnClick={handleOnLogin}>
          <BsGoogle />
          Log in with Google
        </Button>
      </div>
    </section>
  );
};
Login.Layout = LayoutWithoutHeader;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const providers = await getProviders();
  const session = await getSession({ req });
  const { user = null } = session ?? {};
  if (!user) {
    return {
      props: { providers },
    };
  }
  if (user && !user.username) {
    return {
      redirect: {
        destination: USER_ROUTES.USER_CREATE,
        props: {},
      },
    };
  }
  return {
    redirect: {
      destination: GOALS_ROUTES.GOAL_FEED,
      props: {},
    },
  };
};

export default Login;
