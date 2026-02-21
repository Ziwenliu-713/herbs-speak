# react-five-pages

一个 **React 网站示例**：包含 **5 个界面（路由页面）**，每个页面都能通过 **复用组件**展示 **图片与视频**。

## 运行方式

1. 安装 Node.js（建议 18+ / 20+）。
2. 在项目目录运行：

```bash
npm install
npm run dev
```

然后打开终端提示的本地地址（默认端口 `5173`）。

## 结构说明（组件复用）

- `src/components/Media/MediaCard.tsx`: 单个媒体卡片（图片/视频通用）
- `src/components/Media/MediaGallery.tsx`: 媒体网格画廊（复用 `MediaCard`）
- `src/data/pages.ts`: 5 个页面的媒体数据（换数据即可换内容）
- `src/pages/*`: 5 个页面复用同一套 `PageShell + MediaGallery`

