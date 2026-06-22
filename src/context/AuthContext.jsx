import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and provides user auth state.
 * Uses localStorage to persist user data across reloads.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("raghu-hub-user", null);

  function signIn(name, email) {
    setUser({ name, email });
  }

  function signOut() {
    setUser(null);
  }

  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume auth context.
 * Must be used inside <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
