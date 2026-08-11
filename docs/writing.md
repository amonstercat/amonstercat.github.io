# 写作与发布流程

## 日常写作

推荐流程：

1. 运行 `npm run new-post -- "文章标题"` 生成文章模板。
2. 用 Typora、TypePro、VS Code 或任意 Markdown 编辑器打开生成的 `.md` 文件。
3. 写完后把 `draft: true` 改成 `draft: false`，或直接删掉 `draft`。
4. 本地运行 `npm run dev` 预览。
5. 提交并推送到 GitHub，GitHub Actions 会自动发布到域名。

文章都放在：

```text
src/content/blog/
```

## Markdown 文件格式

```md
---
title: "文章标题"
description: "文章摘要，会显示在列表页和 RSS 里"
pubDate: "2026-05-22"
tags: ["Java", "Redis"]
draft: false
---

正文内容。
```

## 发布命令

```bash
git add .
git commit -m "Add new post"
git push
```

推送后 GitHub Pages 自动构建。你不用登录服务器，不用传 FTP，也不用运行 Docker。

## 是否麻烦

不麻烦，但它是“文件 + Git”的发布方式：

- 优点：稳定、可回滚、免费、没有服务器维护。
- 代价：发布需要一次 `git commit` 和 `git push`。

如果以后你想完全图形化，可以再接 Pages CMS / Decap CMS 这类 Git-based CMS，让浏览器里写文章后自动提交到 GitHub。

## 修改样式从哪里开始

常见样式入口：

- `src/styles/global.css`：全站宽度、背景、颜色、文章正文排版。
- `src/pages/index.astro`：首页顶部简介和首页区块。
- `src/components/PostList.astro`：文章列表卡片。
- `src/layouts/BaseLayout.astro`：顶部导航、底部、站点 logo。
- `public/favicon.svg`：浏览器标签页 icon。
- `src/pages/blog/[...slug].astro`：文章详情页、左侧目录、Mermaid 图表渲染。

如果你只是想调清新程度、留白、颜色，优先改 `src/styles/global.css`。

如果你想改首页第一屏文案，改 `src/pages/index.astro`。
