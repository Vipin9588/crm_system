import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";
import { AuthContextType } from "./Authcontext";
import type { User } from "firebase/auth";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";


import { auth } from "@/config/firebase";

type Props = {
    children: React.ReactNode;
};
const provider = new GoogleAuthProvider();
export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    // SIGNUP
    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    // GOOGLESIGNIN


    // const auth = getAuth();
    const googleSignIn = async () => {
        try {
            const result = await signInWithPopup(
                auth,
                provider
            );


        } catch (error: any) {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    };



    // LOGIN
    const login = async (email: string, password: string) => {
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    // LOGOUT
    const logout = async () => {
        await signOut(auth);
    };

    // CURRENT USER
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);

                setLoading(false);
            }
        );
        return unsubscribe;
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signUp,
                login,
                googleSignIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};