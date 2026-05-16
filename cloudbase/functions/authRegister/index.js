const cloud = require('wx-server-sdk');
const crypto = require('crypto');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

exports.main = async (event) => {
  const { email, password, verificationCode } = event || {};
  const trimmed = String(email || '').trim().toLowerCase();
  const code = String(verificationCode || '').trim();
  const pwd = String(password || '');

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'invalid_email' };
  }
  if (pwd.length < 6) {
    return { ok: false, error: 'password_too_short' };
  }
  if (!code) {
    return { ok: false, error: 'invalid_verification_code' };
  }

  const now = Date.now();

  // 校验验证码
  const codesRes = await db.collection('verification_codes')
    .where({ email: trimmed })
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  const rec = codesRes.data && codesRes.data[0];
  if (!rec || rec.code !== code || rec.expiresAt < now) {
    return { ok: false, error: 'invalid_verification_code' };
  }

  // 检查邮箱是否已注册
  const usersRes = await db.collection('users').where({ email: trimmed }).count();
  if (usersRes.total > 0) {
    return { ok: false, error: 'email_already_registered' };
  }

  const user = {
    email: trimmed,
    passwordHash: hashPassword(pwd),
    nickname: trimmed.split('@')[0],
    avatar: null,
    createdAt: now
  };

  await db.collection('users').add({
    data: user
  });

  // 不返回 passwordHash
  const { passwordHash, ...safe } = user;
  return { ok: true, user: safe };
};
