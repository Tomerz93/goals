import { FC, createContext, useContext } from 'react'
import { auth } from '@lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = createContext({ user: null, username: '' })

const useWithAuthContext = () => {
    const { user, username } = useContext(AuthContext)
    return { user, username }
}
const AuthProvider: FC = ({ children }) => {
    const [user] = useAuthState(auth);
    return (
        <AuthContext.Provider value={{ user: user, username: '' }}>
            {children}
        </AuthContext.Provider>
    )

}
export { AuthProvider, useWithAuthContext }