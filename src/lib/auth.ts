import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
