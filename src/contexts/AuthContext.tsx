import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

const AUTH_STORAGE = 'auth-user';
export type User = authApi.User;

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string, verificationCode: string) => Promise<{ ok: boolean; error?: string }>;
  sendVerificationCode: (email: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'nickname' | 'avatar'>>) => void;
}

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(u: User | null) {
  if (u) localStorage.setItem(AUTH_STORAGE, JSON.stringify(u));
  else localStorage.removeItem(AUTH_STORAGE);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    if (res.ok && res.user) setUser(res.user);
    return { ok: res.ok, error: res.error };
  }, []);

  const register = useCallback(async (email: string, password: string, verificationCode: string) => {
    const res = await authApi.register(email, password, verificationCode);
    if (res.ok && res.user) setUser(res.user);
    return { ok: res.ok, error: res.error };
  }, []);

  const sendVerificationCode = useCallback((email: string) => authApi.sendVerificationCode(email), []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((data: Partial<Pick<User, 'nickname' | 'avatar'>>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const value: AuthContextValue = {
    user,
    isLoggedIn: !!user,
    login,
    register,
    sendVerificationCode,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
