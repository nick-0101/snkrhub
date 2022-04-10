import { FC, createContext, useContext, useEffect, useState } from 'react';

// Types 
type User = firebase.User | null;
type ContextState = { user: User }

// Create auth context
const AuthContext = createContext<ContextState | undefined>(undefined)

// Use auth function for screens 
export const useAuth = () => {
    return useContext(AuthContext)
}

// Auth provider
const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = null;
    }, [])

    const value = {
    user,
    // getUser,
    // login,
    // signOut,
    // signUp
  }

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    )
}