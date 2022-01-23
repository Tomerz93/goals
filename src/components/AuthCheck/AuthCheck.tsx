import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWithAuthContext } from '@lib/context/auth';
import { GOALS_ROUTES } from '@lib/routes';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { user, isFetching } = useWithAuthContext();
  useEffect(() => {
    if (!user && !isFetching) {
      router.push('/login');
    }
    if (pathname === '/login' && user) {
      router.push(GOALS_ROUTES.GOAL_FEED);
    }
  }, [user, isFetching]);
  return isFetching ? <div>Loading...</div> : (children as any);
};
export default AuthCheck;
