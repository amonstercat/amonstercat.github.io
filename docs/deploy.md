# 博客搭建与部署流程

## 结论

当前方案是 Astro 静态博客 + GitHub Pages 自动部署。

- 不需要买服务器。
- 不需要 Docker。
- 可以本机预览和构建。
- 可以继续使用 `https://amonstercat.github.io`。
- 买独立域名后，可以绑定到 GitHub Pages 或 Cloudflare Pages。

## 本机开发

```bash
npm install
npm run dev
```

开发地址：`http://localhost:4321`

## 发布到 GitHub Pages

1. 把这个项目推送到 `amonstercat/amonstercat.github.io` 仓库。
2. 进入仓库 `Settings -> Pages`。
3. Source 选择 `GitHub Actions`。
4. 推送到 `main` 或 `master` 后，`.github/workflows/deploy.yml` 会自动构建并发布。

## 绑定自定义域名

假设域名是 `example.com`，推荐让博客主入口使用 `www.example.com`：

1. 在域名 DNS 服务商添加 `CNAME`：
   - 主机记录：`www`
   - 指向：`amonstercat.github.io`
2. 在 GitHub 仓库 `Settings -> Pages -> Custom domain` 填入 `www.example.com`。
3. 勾选 `Enforce HTTPS`。
4. 如果也想让 `example.com` 可访问，需要给 apex/root 域名配置 GitHub Pages 要求的 A/AAAA 记录，或使用支持 ALIAS/ANAME 的 DNS 服务商。

如果域名托管在 Cloudflare，也可以改用 Cloudflare Pages：

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main` 或 `master`

## 什么时候需要服务器

只有这些情况才建议买服务器：

- 需要登录后台、数据库、动态 API。
- 需要自托管评论系统、搜索服务、对象存储代理。
- 需要跑定时任务或私有服务。

纯博客文章、标签、归档、RSS、站点地图都可以静态生成，不需要服务器。

## 什么时候需要 Docker

这个项目不需要 Docker。Docker 只适合这些场景：

- 你想在 VPS 上用 Nginx 容器托管 `dist/`。
- 团队多人协作，需要完全一致的构建环境。
- 后续加了数据库、后台、搜索等服务。

目前保持无 Docker 会更轻，维护成本更低。

## 远程服务器部署也可行吗

可行。远程服务器部署的核心是：

1. 本地或 CI 运行 `npm run build`。
2. 把生成的 `dist/` 上传到服务器。
3. 用 Nginx 或 Caddy 指向 `dist/`。
4. 域名 DNS 指向服务器 IP。
5. 配置 HTTPS 证书。

但如果只是个人静态博客，GitHub Pages 或 Cloudflare Pages 会更省心。服务器方案适合你后续需要自托管评论、搜索、后台服务、API 或多个站点统一管理的时候。

## 旧博客迁移

我已把旧的 `amonstercat.github.io` 静态产物克隆到了 `old-site/` 作为参考。旧仓库里没有 Markdown 源文档，只有生成后的 HTML，所以建议后续迁移方式是：

1. 优先找回原 Hexo 源项目。
2. 如果找不到源项目，再从 `old-site/YYYY/MM/DD/.../index.html` 手工或半自动转成 Markdown。
3. 图片可以继续使用旧站 `img/` 或你的 `blog-images` 仓库。
