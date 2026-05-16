const cloud = require('wx-server-sdk');
const nodemailer = require('nodemailer');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 验证码有效期（毫秒）
const CODE_EXPIRY = 5 * 60 * 1000;

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

exports.main = async (event) => {
  const { email } = event || {};
  const trimmed = String(email || '').trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'invalid_email' };
  }

  const code = genCode();

  // 存储验证码到数据库
  await db.collection('verification_codes').add({
    data: {
      email: trimmed,
      code,
      createdAt: Date.now(),
      expiresAt: Date.now() + CODE_EXPIRY
    }
  });

  // 发送邮件（需配置 SMTP 环境变量）
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.qq.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: true,
      auth: { user: smtpUser, pass: smtpPass }
    });
    await transporter.sendMail({
      from: `"herbs speak" <${smtpUser}>`,
      to: trimmed,
      subject: 'herbs speak 注册验证码',
      text: `您的验证码是：${code}，5分钟内有效。`,
      html: `<p>您的验证码是：<strong>${code}</strong></p><p>5分钟内有效。</p>`
    });
  } else {
    // 未配置 SMTP 时，仅在开发环境返回验证码（勿在生产使用）
    console.warn('SMTP not configured, code:', code);
  }

  return { ok: true };
};
