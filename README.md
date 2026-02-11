# Chinese Idioms Collection | 歇后语英文译解

一个精美的中国歇后语双语展示网站，包含经典歇后语的英文翻译和精美配图。

## ✨ 功能特点

- 📚 **经典歇后语** - 精选中国传统文化中最具代表性的歇后语
- 🖼️ **精美配图** - 每个歇后语配有独特的艺术风格插图
- 🌐 **双语展示** - 中英文对照，便于国际友人理解
- 🎨 **现代设计** - 采用 shadcn/ui 组件库，响应式布局
- 🚀 **纯静态** - 无需服务器，可直接部署到 Cloudflare Pages
- 🌙 **暗色模式** - 支持明暗主题切换

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **UI组件**: shadcn/ui (Radix UI)
- **样式**: Tailwind CSS 4
- **构建**: 静态导出 (Static Export)

## 📦 本地开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5000` 查看网站

### 构建生产版本

```bash
pnpm build
```

构建完成后，静态文件将在 `out` 目录中。

## 🌍 部署到 Cloudflare Pages

### 方法一：通过 Git 仓库部署（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 登录 Cloudflare 控制台
3. 进入 Pages 项目
4. 点击 "Create a project"
5. 选择 "Connect to Git"
6. 选择你的仓库并授权
7. 配置构建设置：
   - **Build command**: `pnpm install && pnpm build`
   - **Build output directory**: `out`
8. 点击 "Save and Deploy"

### 方法二：直接上传

1. 本地构建项目：
   ```bash
   pnpm install && pnpm build
   ```

2. 登录 Cloudflare 控制台
3. 进入 Pages 项目
4. 点击 "Create a project"
5. 选择 "Upload Assets"
6. 拖拽 `out` 文件夹中的所有文件
7. 点击 "Deploy site"

### 方法三：使用 Wrangler CLI

1. 安装 Wrangler：
   ```bash
   pnpm add -D wrangler
   ```

2. 构建项目：
   ```bash
   pnpm build
   ```

3. 部署：
   ```bash
   npx wrangler pages deploy out
   ```

## 📁 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主页面
│   │   ├── layout.tsx        # 全局布局
│   │   └── globals.css       # 全局样式
│   ├── components/
│   │   ├── XiehouyuCard.tsx  # 歇后语卡片组件
│   │   └── ui/               # shadcn/ui 组件库
│   ├── data/
│   │   └── xiehouyu.ts       # 歇后语数据
│   └── lib/
│       └── utils.ts          # 工具函数
├── public/                   # 静态资源
├── next.config.ts           # Next.js 配置
└── package.json             # 项目依赖
```

## 🎨 添加新的歇后语

编辑 `src/data/xiehouyu.ts` 文件，添加新的歇后语数据：

```typescript
{
  id: '11',
  chinese: '中文前半句',
  chineseMeaning: '中文后半句',
  english: 'English translation',
  englishMeaning: 'English meaning',
  imageUrl: '图片URL'
}
```

## 🌐 自定义配置

### 修改网站标题和描述

编辑 `src/app/page.tsx` 中的 `metadata`：

```typescript
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your Description',
};
```

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量。

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ using Next.js & shadcn/ui
