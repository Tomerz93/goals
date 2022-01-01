import { FC, createContext, useContext } from 'react';
import { auth } from '@lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext({
  user: null,
  isFetching: false,
});

const useWithAuthContext = () => {
  const { user, isFetching } = useContext(AuthContext);
  return { user, isFetching };
};
const AuthProvider: FC = ({ children }) => {
  const [authUser, isFetching] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user: authUser, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useWithAuthContext };
