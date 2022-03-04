import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface AuthCheckProps {
  children: React.ReactNode;
}

const Redirect: React.FC<{ path: string }> = ({ path }) => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(path);
  }, []);
  return null;
};

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  return isUser ? (
    <>{children}</>
  ) : (
    <div>
      {status === 'loading' ? 'Loading...' : <Redirect path="/login" />}
    </div>
  );
};
export default AuthCheck;
