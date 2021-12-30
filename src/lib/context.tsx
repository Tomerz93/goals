import { FC, createContext, useContext, useEffect, useState } from 'react';
import { auth, getDocById } from '@lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext({
  user: null,
  username: '',
  loading: false,
  isFetching: true,
});

const useWithAuthContext = () => {
  const { user, username, loading, isFetching } = useContext(AuthContext);
  return { user, username, loading, isFetching };
};
const AuthProvider: FC = ({ children }) => {
  const [authUser, isFetching] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (authUser) {
        setLoading(true);
        const firebaseUser = await getDocById('users', authUser.uid);
        if (firebaseUser) {
          setUsername(firebaseUser.username);
          setLoading(false);
        }
      }
    })();
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{ user: authUser, username, loading, isFetching }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useWithAuthContext };
