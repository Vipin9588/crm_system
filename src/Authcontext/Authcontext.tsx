import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;

  signUp: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

