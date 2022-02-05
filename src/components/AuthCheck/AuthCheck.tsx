import React from 'react';
import { useSession } from 'next-auth/react';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  return isUser ? (
    <>{children}</>
  ) : (
    <div>{status === 'loading' ? 'Loading...' : 'You are not logged in'}</div>
  );
};
export default AuthCheck;
