# CloudBase 邮箱验证码认证配置指南

配置完成后，用户可享受：

- 输入邮箱 → 平台发送真实验证码到邮箱
- 填写验证码 + 设置密码 → 完成注册
- 之后每次登录：邮箱 + 密码

---

## 一、前置准备

1. 腾讯云账号
2. 已开通 CloudBase 云开发环境

---

## 二、CloudBase 控制台配置

### 1. 创建数据库集合

在 CloudBase 控制台 → 数据库 → 添加集合：

- `users`：存储用户信息（email, passwordHash, nickname, avatar, createdAt）
- `verification_codes`：存储验证码（email, code, createdAt, expiresAt）

### 2. 设置数据库权限

- `users`：仅云函数可读写，所有用户可读（或按需配置）
- `verification_codes`：仅云函数可读写

### 3. 部署云函数

```bash
cd cloudbase
# 修改 cloudbaserc.json 中的 YOUR_ENV_ID 为你的环境 ID
cloudbase functions:deploy sendVerificationCode
cloudbase functions:deploy authRegister
cloudbase functions:deploy authLogin
```

或在 CloudBase 控制台手动创建这三个云函数，将 `functions/` 下对应目录的代码复制进去。

### 4. 配置 SMTP（发送邮件）

在 `sendVerificationCode` 云函数中配置环境变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| SMTP_USER | 发件邮箱 | your@qq.com |
| SMTP_PASS | SMTP 授权码（非邮箱密码） | xxxxxxxx |
| SMTP_HOST | SMTP 服务器 | smtp.qq.com |
| SMTP_PORT | 端口 | 465 |

**QQ 邮箱**：登录 QQ 邮箱 → 设置 → 账户 → 开启 IMAP/SMTP → 获取授权码

---

## 三、前端配置

在项目根目录创建 `.env` 或 `.env.local`：

```
VITE_CLOUDBASE_ENV=你的环境ID
```

例如：`VITE_CLOUDBASE_ENV=herbs-speak-6g1ojv3z3527189f`

重新构建并部署后，注册/登录将使用 CloudBase 云函数。

---

## 四、未配置时的行为

未设置 `VITE_CLOUDBASE_ENV` 时，系统使用**本地演示模式**：

- 注册：验证码固定为 `123456`
- 登录：使用本地 localStorage 存储的账号
- 游客可浏览，点击视频/功能时提示注册

---

## 五、云函数说明

| 云函数 | 功能 |
|--------|------|
| sendVerificationCode | 生成 6 位验证码，存入数据库，通过 SMTP 发送邮件 |
| authRegister | 校验验证码，创建用户（密码加密存储） |
| authLogin | 校验邮箱+密码，返回用户信息 |

---

## 六、常见问题

**Q：收不到验证码？**  
A：检查 SMTP 环境变量是否正确，QQ 邮箱需使用授权码而非登录密码。

**Q：登录提示邮箱或密码错误？**  
A：确认已用 CloudBase 注册过账号，且密码正确。旧版 localStorage 数据与 CloudBase 不互通。
