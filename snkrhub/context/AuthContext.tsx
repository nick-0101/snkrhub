import { FC, createContext, useContext, useEffect, useState } from 'react';

// Firebase
import firebase from "firebase/auth";
import { auth, db } from "../firebaseSetup";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// Types 
type User = firebase.User | null;
type ContextState = { 
    loading: boolean,
    user: User,
    signUp: (email: string, password: string) => Promise<firebase.UserCredential>,
    signOutUser: () => Promise<void>,
    signIn: (email: string, password: string) => Promise<firebase.UserCredential>,
    getUser: () => firebase.User | null
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
    const signUp = async (email: string, password: string) => {
        // try {
        //     const newUser = await runTransaction(db, async (transaction) => {
        //         const usrDoc = await transaction.get(usrDocRef);

        //         // Username does not exist
        //         if (!usrDoc.exists()) {
        //             // Create user
        //             const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                    
        //             // pull the user’s unique ID out of the result
        //             const uid = userCredential.user.uid

        //             transaction.set(usrDocRef, { userId: uid })
        //         }
        //     });

        //     console.log("Population increased to ", newUser);
        // } catch (e) {
        //     // This will be a "population is too big" error.
        //     console.error(e);
        // }
        
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
        setLoading(true)

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false)
            } else {
                setUser(null);
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