import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("savorly-auth") === "true"
  );

  const login = (email: string, password: string): boolean => {
    if (
      email === "demo@savorly.com" &&
      password === "password123"
    ) {
      sessionStorage.setItem("savorly-auth", "true");
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("savorly-auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}