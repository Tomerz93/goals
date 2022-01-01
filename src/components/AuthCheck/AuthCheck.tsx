import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWithAuthContext } from '@lib/context/auth';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();
  const { user, isFetching } = useWithAuthContext();
  useEffect(() => {
    if (!user && !isFetching) {
      router.push('/login');
    }
  }, [user, isFetching]);
  return isFetching ? <div>Loading...</div> : (children as any);
};
export default AuthCheck;
