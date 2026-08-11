# Amonstercat Minimal Blog

一个基于 Astro 的极简静态博客。写作使用 Markdown，构建产物是纯静态 HTML/CSS，可部署到 GitHub Pages、Cloudflare Pages、Vercel、Nginx 或任意静态托管。

## 本机运行

```bash
npm install
npm run dev
```

默认开发地址是 `http://localhost:4321`。

## 写文章

用脚本生成文章模板：

```bash
npm run new-post -- "文章标题"
```

然后在 `src/content/blog/` 里编辑生成的 Markdown 文件：

```md
---
title: "文章标题"
description: "文章摘要"
pubDate: "2026-05-22"
tags: ["Java", "Redis"]
---

正文内容。
```

更完整的流程见 [docs/writing.md](docs/writing.md)。

## 构建

```bash
npm run build
npm run preview
```

构建产物在 `dist/`。

## 部署选择

- GitHub Pages：推荐默认方案，不需要买服务器，不需要 Docker。
- Cloudflare Pages：如果你准备把域名也托管到 Cloudflare，体验很好。
- 自购服务器：只有需要数据库、后台、登录、评论服务自托管等动态能力时再考虑。
- Docker：可选，不是静态博客必需品。
