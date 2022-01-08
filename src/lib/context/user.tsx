import { FC, createContext, useContext, useState, useEffect } from 'react';
import { getRef } from '@lib/firebase';
import { onSnapshot } from 'firebase/firestore';

import { useWithAuthContext } from '@lib/context/auth';

interface User {
  email: string;
  id: string;
  username: string;
  avatarUrl: string;
}

const UserContext = createContext<{
  user: null | User;
  error: string;
  isLoading: boolean;
}>({
  user: null,
  error: '',
  isLoading: false,
});

const useUserContext = () => {
  const { user, isLoading, error } = useContext(UserContext);
  return { user, isLoading, error };
};

const UserProvider: FC = ({ children }) => {
  const { user: authUser } = useWithAuthContext();
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!authUser) return;
    setIsLoading(true);
    setError('');
    const firebaseUser = getRef('users', authUser.uid);
    const unsubscribe = onSnapshot(firebaseUser, (snapshot) => {
      snapshot.exists() ? setUser(snapshot.data() as User) : setUser(null);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user, error, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
