import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as authApi from '../api/auth.api';
import type { LoginPayload, User } from '../types/auth';
import {
  clearAuthData,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser<User>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!getToken()) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.me();
        setUser(currentUser);
        setStoredUser(currentUser);
      } catch {
        clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function login(payload: LoginPayload): Promise<void> {
    const response = await authApi.login(payload);

    setToken(response.data.token);
    setStoredUser(response.data.user);
    setUser(response.data.user);
  }

  async function logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      clearAuthData();
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}