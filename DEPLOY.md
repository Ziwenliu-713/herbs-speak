# herbs speak 部署指南

## ✅ 已完成的准备工作
- 项目已能正常构建
- 已添加 `vercel.json` 以支持页面刷新和直接访问链接

---

## 第一步：安装 Git（如未安装）

1. 打开 https://git-scm.com/download/win
2. 下载并安装，一路「下一步」即可
3. 安装完成后，**关闭并重新打开** Cursor 或终端

---

## 第二步：创建 GitHub 仓库

1. 打开 https://github.com
2. 登录后，点击右上角 **+** → **New repository**
3. **Repository name** 填：`herbs-speak`
4. 选择 **Public**
5. **不要**勾选 "Add a README file"
6. 点击 **Create repository**
7. 记住你的 GitHub 用户名（例如：`ziwenliu`）

---

## 第三步：在终端执行以下命令

在 Cursor 中按 **Ctrl + `** 打开终端，复制粘贴并执行（**把 `你的用户名` 改成你的 GitHub 用户名**）：

```bash
cd C:\Users\10509\.vscode\react-five-pages

git init
git add .
git commit -m "herbs speak - initial deploy"

git branch -M main
git remote add origin https://github.com/你的用户名/herbs-speak.git
git push -u origin main
```

**若提示输入密码**：GitHub 已不支持密码，请使用 Token：
- 打开 https://github.com/settings/tokens
- Generate new token (classic)
- 勾选 `repo`，生成后复制 Token
- 在 `Password` 处粘贴 Token

---

## 第四步：部署到 Vercel

1. 打开 https://vercel.com
2. 点击 **Sign Up** → 选择 **Continue with GitHub**
3. 授权后，点击 **Add New...** → **Project**
4. 找到 **herbs-speak** → 点击 **Import**
5. 点击 **Deploy**
6. 等待 1～2 分钟，部署完成

---

## 第五步：获取你的网站链接

部署成功后，会显示类似：
**https://herbs-speak-xxx.vercel.app**

这就是你的网站链接，可以发给任何人访问！

---

## 以后更新网站

修改代码后，在终端执行：

```bash
git add .
git commit -m "Update"
git push
```

Vercel 会自动重新部署，约 1～2 分钟即可生效。
