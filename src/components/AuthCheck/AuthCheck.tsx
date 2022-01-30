import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWithAuthContext } from '@lib/context/auth';
import { GOALS_ROUTES } from '@lib/routes';
import { useSession } from 'next-auth/react';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  return isUser ? (
    children
  ) : (
    <div>{status === 'loading' ? 'Loading...' : 'You are not logged in'}</div>
  );
};
export default AuthCheck;
