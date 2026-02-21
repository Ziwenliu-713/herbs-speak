import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AUTH_STORAGE = 'auth-user';
const USERS_STORAGE = 'auth-users-registry';

export interface User {
  email: string;
  nickname: string;
  avatar: string | null;
  createdAt: number;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (email: string, password: string, verificationCode: string) => { ok: boolean; error?: string };
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

function loadUsers(): Record<string, { password: string; user: User }> {
  try {
    const raw = localStorage.getItem(USERS_STORAGE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem(USERS_STORAGE, JSON.stringify(users));
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const login = useCallback((email: string, password: string) => {
    const users = loadUsers();
    const key = email.trim().toLowerCase();
    const record = users[key];
    if (!record || record.password !== password) {
      return { ok: false as const, error: 'email_or_password_invalid' };
    }
    setUser(record.user);
    return { ok: true as const };
  }, []);

  const register = useCallback((email: string, password: string, verificationCode: string) => {
    if (verificationCode.trim() !== '123456') {
      return { ok: false as const, error: 'invalid_verification_code' };
    }
    const key = email.trim().toLowerCase();
    const users = loadUsers();
    if (users[key]) return { ok: false as const, error: 'email_already_registered' };
    const newUser: User = {
      email: key,
      nickname: key.split('@')[0],
      avatar: null,
      createdAt: Date.now()
    };
    users[key] = { password, user: newUser };
    saveUsers(users);
    setUser(newUser);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((data: Partial<Pick<User, 'nickname' | 'avatar'>>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const value: AuthContextValue = {
    user,
    isLoggedIn: !!user,
    login,
    register,
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
