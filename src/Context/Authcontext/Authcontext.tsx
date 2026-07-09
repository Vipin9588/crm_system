import { createContext } from "react";
import type { User } from "firebase/auth";
import type { UserCredential, AdditionalUserInfo } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;

  signUp: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);