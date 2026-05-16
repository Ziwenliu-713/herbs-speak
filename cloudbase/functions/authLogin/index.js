const cloud = require('wx-server-sdk');
const crypto = require('crypto');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

exports.main = async (event) => {
  const { email, password } = event || {};
  const trimmed = String(email || '').trim().toLowerCase();
  const pwd = String(password || '');

  if (!trimmed || !pwd) {
    return { ok: false, error: 'email_or_password_invalid' };
  }

  const res = await db.collection('users')
    .where({ email: trimmed })
    .limit(1)
    .get();

  const doc = res.data && res.data[0];
  if (!doc) {
    return { ok: false, error: 'email_or_password_invalid' };
  }

  const passwordHash = hashPassword(pwd);
  if (doc.passwordHash !== passwordHash) {
    return { ok: false, error: 'email_or_password_invalid' };
  }

  const { passwordHash: _, _id, ...user } = doc;
  const safe = {
    email: user.email,
    nickname: user.nickname || user.email.split('@')[0],
    avatar: user.avatar || null,
    createdAt: user.createdAt
  };

  return { ok: true, user: safe };
};
