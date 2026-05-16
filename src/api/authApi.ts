/**
 * 认证 API：支持 CloudBase 云函数 与 本地演示 两种模式
 * 设置 VITE_CLOUDBASE_ENV=你的环境ID 后使用 CloudBase
 */
import cloudbase from '@cloudbase/js-sdk';

export interface User {
  email: string;
  nickname: string;
  avatar: string | null;
  createdAt: number;
}

const ENV_ID = import.meta.env.VITE_CLOUDBASE_ENV || '';
const USE_CLOUDBASE = !!ENV_ID;

let app: ReturnType<typeof cloudbase.init> | null = null;

function getApp() {
  if (!app) {
    app = cloudbase.init({ env: ENV_ID, region: 'ap-shanghai' });
  }
  return app;
}

export async function sendVerificationCode(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!USE_CLOUDBASE) {
    return { ok: true }; // 演示模式：直接成功，验证码填 123456
  }
  try {
    const res = await getApp().callFunction({
      name: 'sendVerificationCode',
      data: { email: email.trim().toLowerCase() }
    });
    const data = (res as { result?: { ok?: boolean; error?: string } }).result;
    if (data?.ok === false) return { ok: false, error: data.error || 'send_failed' };
    return { ok: true };
  } catch (e) {
    console.error('sendVerificationCode', e);
    return { ok: false, error: 'send_failed' };
  }
}

export async function register(
  email: string,
  password: string,
  verificationCode: string
): Promise<{ ok: boolean; user?: User; error?: string }> {
  if (!USE_CLOUDBASE) {
    if (verificationCode.trim() !== '123456') {
      return { ok: false, error: 'invalid_verification_code' };
    }
    const key = email.trim().toLowerCase();
    const raw = localStorage.getItem('auth-users-registry');
    const users: Record<string, { password: string; user: User }> = raw ? JSON.parse(raw) : {};
    if (users[key]) return { ok: false, error: 'email_already_registered' };
    const user: User = {
      email: key,
      nickname: key.split('@')[0],
      avatar: null,
      createdAt: Date.now()
    };
    users[key] = { password, user };
    localStorage.setItem('auth-users-registry', JSON.stringify(users));
    return { ok: true, user };
  }
  try {
    const res = await getApp().callFunction({
      name: 'authRegister',
      data: {
        email: email.trim().toLowerCase(),
        password,
        verificationCode: verificationCode.trim()
      }
    });
    const data = (res as { result?: { ok?: boolean; user?: User; error?: string } }).result;
    if (data?.ok === false) return { ok: false, error: data.error || 'register_failed' };
    if (data?.user) return { ok: true, user: data.user };
    return { ok: false, error: 'register_failed' };
  } catch (e) {
    console.error('register', e);
    return { ok: false, error: 'register_failed' };
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ ok: boolean; user?: User; error?: string }> {
  if (!USE_CLOUDBASE) {
    const key = email.trim().toLowerCase();
    const raw = localStorage.getItem('auth-users-registry');
    const users: Record<string, { password: string; user: User }> = raw ? JSON.parse(raw) : {};
    const record = users[key];
    if (!record || record.password !== password) {
      return { ok: false, error: 'email_or_password_invalid' };
    }
    return { ok: true, user: record.user };
  }
  try {
    const res = await getApp().callFunction({
      name: 'authLogin',
      data: {
        email: email.trim().toLowerCase(),
        password
      }
    });
    const data = (res as { result?: { ok?: boolean; user?: User; error?: string } }).result;
    if (data?.ok === false) return { ok: false, error: data.error || 'login_failed' };
    if (data?.user) return { ok: true, user: data.user };
    return { ok: false, error: 'login_failed' };
  } catch (e) {
    console.error('login', e);
    return { ok: false, error: 'login_failed' };
  }
}
