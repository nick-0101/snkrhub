import { FC, createContext, useContext, useEffect, useState } from 'react';

// Firebase
import firebase from "firebase/auth";
import { auth } from "../firebaseSetup";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Types 
type User = firebase.User | null;
type ContextState = { 
    loading: boolean,
    user: User,
    signUp: (email: string, password: string) => Promise<firebase.UserCredential>
    signOutUser: () => Promise<void>,
    signIn: (email: string, password: string) => Promise<firebase.UserCredential>
}

// Create auth context
const AuthContext = createContext<ContextState | undefined>(undefined)

// Use auth function for screens 
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            "useFirebaseAuth must be used within a AuthProvider"
        );
    }
    return context;
}

// Auth provider
const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    
    // User functions
    const signUp = (email: string, password: string) => {
        // TODO: On sign up, also create document with username
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        return signOut(auth)
    }

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const getUser = () => {
        return auth.currentUser;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // setTimeout(() => {
            //     if (user) {
            //         setUser(user);
            //         setLoading(false)
            //     }
            // }, 5000)
            if (user) {
                setUser(user);
                setLoading(false)
            } else {
                setLoading(false)
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        getUser,
        signIn,
        signOutUser,
        signUp,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }