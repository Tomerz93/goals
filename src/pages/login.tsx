import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BsGoogle } from 'react-icons/bs';
import { Button, LayoutWithoutHeader } from '@components/UI';
import { logInWithProvider } from '@lib/firebase';
import { USER_ROUTES } from '@lib/routes';
import styles from './Login.module.scss';
import { useWithAuthContext } from '@lib/context';

const Login: NextPage = () => {
  const router = useRouter();
  const { user, username } = useWithAuthContext();

  useEffect(() => {
    if (user && !username) router.push(USER_ROUTES.USER_CREATE);
  }, [user]);
  const handleOnLogin = async () => {
    await logInWithProvider();
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

export default Login;
