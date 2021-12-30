import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWithAuthContext } from '@lib/context';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();
  const { isFetching, user } = useWithAuthContext();
  useEffect(() => {
    if (!isFetching && !user) {
      router.push('/login');
    }
  }, [user]);
  return isFetching ? <div>Loading...</div> : (children as any);
};
export default AuthCheck;
