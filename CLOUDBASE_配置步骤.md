# CloudBase 验证码注册 / 登录 - 完整配置步骤

按顺序完成以下步骤，即可启用真实的邮箱验证码注册和登录。

---

## 第一步：进入 CloudBase 控制台

1. 打开浏览器，访问：https://console.cloud.tencent.com/tcb  
2. 登录腾讯云账号  
3. 如还没有环境：点击「新建环境」创建一个  
4. 进入你的环境，**记下环境 ID**（例如：`herbs-speak-xxx`，在环境概览页可见）

---

## 第二步：创建数据库集合

1. 在左侧菜单点击 **「数据库」**
2. 点击 **「添加集合」**
3. 新建两个集合：
   - 集合名称：`users`
   - 集合名称：`verification_codes`
4. 两个集合创建后，分别点击进入 → **「权限设置」**：
   - `users`：设为「仅管理端可读写」或「所有用户可读，仅管理端可写」（建议仅管理端）
   - `verification_codes`：设为「仅管理端可读写」

---

## 第三步：部署云函数（二选一）

### 方式 A：在控制台手动创建（推荐，无需 CLI）

1. 左侧菜单点击 **「云函数」**
2. 点击 **「新建云函数」**

#### 3.1 创建 sendVerificationCode

- 函数名称：`sendVerificationCode`
- 运行环境：Node.js 16
- 创建后进入该函数 → **「函数代码」** 标签
- 删除默认代码，将项目 `cloudbase/functions/sendVerificationCode/index.js` 的内容全部复制粘贴进去
- 在云函数目录下新建 `package.json`，内容为：`{"dependencies":{"nodemailer":"^6.9.16","wx-server-sdk":"~2.6.3"}}`  
  （若控制台有「安装依赖」或在线依赖管理，选择安装 nodemailer 和 wx-server-sdk）
- 点击 **「保存」**

在该函数的 **「配置」** 标签 → **「环境变量」** 中添加：

| 变量名    | 变量值（按你的邮箱填写） |
|-----------|---------------------------|
| SMTP_USER | 你的QQ邮箱，如 123456789@qq.com |
| SMTP_PASS | QQ 邮箱授权码（见下方说明）     |
| SMTP_HOST | smtp.qq.com                |
| SMTP_PORT | 465                        |

**获取 QQ 邮箱授权码：**

1. 登录 QQ 邮箱网页版
2. 设置 → 账户 → 找到「POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务」
3. 开启「IMAP/SMTP 服务」或「POP3/SMTP 服务」
4. 按提示发送短信，获取 **授权码**（16 位，注意不是 QQ 密码）

#### 3.2 创建 authRegister

- 函数名称：`authRegister`
- 运行环境：Node.js 16
- 将 `cloudbase/functions/authRegister/index.js` 的代码复制进去
- 依赖：`wx-server-sdk`（若控制台可安装依赖，请安装；crypto 为 Node 内置，无需安装）
- 保存（此函数不需要额外环境变量）

#### 3.3 创建 authLogin

- 函数名称：`authLogin`
- 运行环境：Node.js 16
- 将 `cloudbase/functions/authLogin/index.js` 的代码复制进去
- 依赖：`wx-server-sdk`（同上）
- 保存（此函数不需要额外环境变量）

---

### 方式 B：使用 CloudBase CLI 部署

如果已安装 CloudBase CLI 且终端可用：

1. 修改 `cloudbase/cloudbaserc.json`，把 `YOUR_ENV_ID` 换成你的环境 ID  
2. 在 `cloudbase` 目录下执行：

```bash
cloudbase functions:deploy sendVerificationCode
cloudbase functions:deploy authRegister
cloudbase functions:deploy authLogin
```

3. 发送验证码函数仍须在控制台为该函数配置 SMTP 环境变量（同上）

---

## 第四步：配置前端环境变量

1. 在项目根目录（`react-five-pages`）找到 `.env.example`
2. 复制一份并重命名为 `.env`（如果已有 `.env` 则直接编辑）
3. 在 `.env` 中设置：

```
VITE_CLOUDBASE_ENV=你的环境ID
```

例如：

```
VITE_CLOUDBASE_ENV=herbs-speak-6g1ojv3z3527189f
```

环境 ID 在 CloudBase 控制台的环境概览页可看到。

4. 保存文件

---

## 第五步：重新构建并部署

1. 在项目根目录执行构建（在 cmd 中）：

```cmd
cd C:\Users\10509\.vscode\react-five-pages
npm run build
```

2. 将生成的 `dist` 目录上传到 CloudBase 静态网站托管

---

## 完成后

- 用户输入邮箱 → 点击「发送验证码」→ 真实验证码会发到邮箱  
- 填写验证码 + 密码 → 完成注册  
- 之后使用「邮箱 + 密码」登录  

---

## 常见问题

**收不到验证码？**

- 确认 SMTP 环境变量正确，尤其是 SMTP_PASS 要用 QQ 邮箱**授权码**，不是登录密码  
- 检查 QQ 邮箱已开启 IMAP/SMTP 服务  

**登录提示邮箱或密码错误？**

- 需先用新流程完成注册，旧的 localStorage 演示数据与 CloudBase 不互通  

**云函数调用失败？**

- 确认三个云函数名称与文档完全一致：`sendVerificationCode`、`authRegister`、`authLogin`  
- 确认前端 `.env` 中的 `VITE_CLOUDBASE_ENV` 正确且已重新构建  
