import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";
import type { User, AdditionalUserInfo } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
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
  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };

  // GOOGLE SIGN IN
  const googleSignIn = async (): Promise<UserCredential> => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // LOGIN
  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  // LOGOUT
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  // CURRENT USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // GET GOOGLE USER INFO
  const getGoogleUserInfo = (
    result: UserCredential
  ): AdditionalUserInfo | null => {
    const additionalUserInfo = getAdditionalUserInfo(result);
    return additionalUserInfo;
  };

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
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};