<div align="center">

# Chinese Idioms Collection
## 中国成语与歇后语英文译解

**[English](#english-version)** | **[中文](#chinese-version)**

A beautiful bilingual website showcasing classic Chinese idioms (成语) and two-part allegorical sayings (歇后语) with detailed English translations, explanations, and artistic illustrations.

一个精美的中国成语与歇后语双语展示网站，包含经典成语和歇后语的英文翻译、详细解释和精美配图。

</div>

---

<a name="english-version"></a>

# English Version

## ✨ Features

- 📚 **Classic Idioms** - Carefully selected idioms from traditional Chinese culture, complete with detailed sources, meanings, and usage examples
- 🎭 **Two-Part Allegorical Sayings** - Collection of classic xiehouyu with Chinese-English bilingual presentation of both the riddle and the answer
- 🖼️ **Artistic Illustrations** - Each idiom and saying is accompanied by unique artistic-style illustrations
- 🌐 **Bilingual Display** - Chinese-English parallel presentation for easy understanding by international audiences
- 🎨 **Modern Design** - Built with shadcn/ui component library, responsive layout
- 🌙 **Dark Mode** - Supports light/dark theme switching
- 🔍 **Search Function** - Quickly search for idioms and sayings

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS 4
- **Theming**: next-themes
- **Icons**: Lucide React

## 📦 Local Development

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to view the website

### Build Production Version

```bash
pnpm build
```

Static files will be in the `out` directory after build.

### Preview Production Build

```bash
pnpm start
```

## 💡 Implementation Approach

This project leverages AI technology to automatically generate English translations and explanations for Chinese idioms and two-part allegorical sayings, reducing the barrier to creating cultural content and making it easier for overseas users to understand traditional Chinese culture.

### Design Philosophy

1. **Content Automation** - Use large language models to generate high-quality English translations, source explanations, meanings, and usage guides without manual writing
2. **Visual Artistry** - Generate unique artistic illustrations for each idiom/saying through text-to-image technology, enhancing visual appeal
3. **Bilingual Friendly** - Parallel Chinese-English presentation reduces cultural understanding barriers
4. **Structured Data** - Unified data format facilitates management and expansion

### Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Input Layer                         │
│              Idiom/Saying Name (e.g., 闻鸡起舞)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Generation Layer                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  DeepSeek LLM                                       │   │
│  │  • Generate structured JSON data                    │   │
│  │  • English translation, source, meaning, usage      │   │
│  │  • Positive/negative prompts for image generation   │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Image Generation Layer                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Doubao/Qianwen Text-to-Image API                   │   │
│  │  • Generate artistic illustrations based on prompts │   │
│  │  • Sharp compress to WebP format                    │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Storage Layer                       │
│  • data.json - Complete data (all fields)                   │
│  • simple.json - Simplified data (for quick display)        │
│  • Image files - WebP format stored in public/ directory    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Display Layer                   │
│  • Next.js 16 static export                                  │
│  • shadcn/ui component library                               │
│  • Responsive design + dark mode                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Adding New Content

The project supports automatic generation of idiom and saying content and illustrations through AI.

### Environment Variable Configuration

Create a `.env.local` file in the project root directory and configure the following API keys:

```env
# DeepSeek API - Used for generating text data
DEEPSEEK_API_KEY=your_deepseek_api_key

# Doubao API - Used for generating images
DOUBAO_ACCESS_KEY_ID=your_doubao_api_key

# Qianwen API - Optional image generation service
ALI_ACCESS_KEY_ID=your_ali_api_key
```

### Usage Example

```typescript
// Generate idioms
const chengyuManager = new IdiomsManager(IDIOM_TYPE.chengyu);
chengyuManager.run(["闻鸡起舞", "鹤立鸡群"], true);

// Generate two-part allegorical sayings
const xiehouyuManager = new IdiomsManager(IDIOM_TYPE.xiehouyu);
xiehouyuManager.run("大海捞针——没处寻");
```

## 📁 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page (redirects to English version)
│   │   ├── en_US/            # English version pages
│   │   ├── layout.tsx        # Global layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   └── ui/               # shadcn/ui component library
│   ├── data/
│   │   ├── en_US/
│   │   │   ├── chengyu/      # Idiom data (JSON format)
│   │   │   └── xiehouyu/     # Two-part allegorical saying data
│   │   ├── zh_CN/            # Chinese data directory
│   │   ├── language.ts       # Language configuration
│   │   └── simple.ts         # Simplified data
│   ├── hooks/                # Custom Hooks
│   ├── lib/                  # Utility functions
│   ├── shared/               # Shared modules
│   └── types/                # TypeScript type definitions
├── public/
│   └── chengyu/              # Idiom illustration resources
├── scripts/
│   ├── IdiomsManager.ts      # Idiom management script
│   └── autoGen/              # Auto-generation tools
├── next.config.js            # Next.js configuration
└── package.json              # Project dependencies
```

## 🎨 Data Structure

### Idiom Data Format

Each idiom contains the following fields:

```typescript
{
  id: number,
  original: string,              // Original idiom (Chinese)
  translation: string,           // English translation
  imageUrl: string,              // Image path
  source: string,                // Source explanation
  meaning: string,               // Meaning explanation
  usage: string,                 // Usage explanation
  imgPositivePrompt: string,     // Image generation positive prompt
  imgNegativePrompt: string,     // Image generation negative prompt
  originalCountry: string        // Country of origin
}
```

### Two-Part Allegorical Saying Data Format

Each saying contains Chinese-English bilingual presentation of both the first part (riddle) and second part (answer).

## 📄 License

MIT

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

Made with ❤️ using Next.js & shadcn/ui

---

<a name="chinese-version"></a>

# 中文版本

## ✨ 功能特点

- 📚 **经典成语** - 精选中国传统文化中最具代表性的成语，包含详细出处、含义和用法
- 🎭 **歇后语** - 收集经典歇后语，前半句谜面与后半句谜底的中英文对照
- 🖼️ **精美配图** - 每个成语和歇后语配有独特的艺术风格插图
- 🌐 **双语展示** - 中英文对照，便于国际友人理解中国文化
- 🎨 **现代设计** - 采用 shadcn/ui 组件库，响应式布局
- 🌙 **暗色模式** - 支持明暗主题切换
- 🔍 **搜索功能** - 快速查找成语和歇后语

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **UI组件**: shadcn/ui (Radix UI)
- **样式**: Tailwind CSS 4
- **主题**: next-themes
- **图标**: Lucide React

## 📦 本地开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000` 查看网站

### 构建生产版本

```bash
pnpm build
```

构建完成后，静态文件将在 `out` 目录中。

### 预览生产构建

```bash
pnpm start
```

## 💡 实现思路

本项目旨在通过 AI 技术自动化生成中国成语与歇后语的英文译解内容，降低文化内容的创作门槛，让海外用户能够更轻松地了解中国传统文化。

### 设计理念

1. **内容自动化** - 利用大语言模型生成高质量的英文翻译、出处说明、含义解释和用法指导，无需人工撰写
2. **视觉艺术化** - 通过文生图技术为每个成语/歇后语生成独特的艺术插图，增强视觉吸引力
3. **双语友好** - 中英文对照展示，降低文化理解门槛
4. **结构化数据** - 统一的数据格式便于管理和扩展

### 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户输入层                            │
│              成语/歇后语名称（如：闻鸡起舞）                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      数据生成层                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  DeepSeek LLM                                       │    │
│  │  • 生成结构化 JSON 数据                              │    │
│  │  • 英文翻译、出处、含义、用法                         │    │
│  │  • 图片生成的正负向提示词                             │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      图片生成层                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  豆包/千问文生图 API                                  │   │
│  │  • 根据提示词生成艺术插图                             │    │
│  │  • Sharp 压缩为 WebP 格式                            │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      数据存储层                              │
│  • data.json - 完整数据（含所有字段）                         │
│  • simple.json - 简化数据（用于快速展示）                     │
│  • 图片文件 - WebP 格式存储在 public/ 目录                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      前端展示层                              │
│  • Next.js 16 静态导出                                       │
│  • shadcn/ui 组件库                                          │
│  • 响应式设计 + 暗色模式                                      │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 添加新的内容

本项目支持通过 AI 自动生成成语和歇后语的内容与配图，无需手动准备资料。

### 环境变量配置

需要在项目根目录创建 `.env.local` 文件，配置以下 API 密钥：

```env
# DeepSeek API - 用于生成文本数据
DEEPSEEK_API_KEY=your_deepseek_api_key

# 豆包 API - 用于生成图片
DOUBAO_ACCESS_KEY_ID=your_doubao_api_key

# 千问 API - 可选的图片生成服务
ALI_ACCESS_KEY_ID=your_ali_api_key
```

### 使用示例

```typescript
// 生成成语
const chengyuManager = new IdiomsManager(IDIOM_TYPE.chengyu);
chengyuManager.run(["闻鸡起舞", "鹤立鸡群"], true);

// 生成歇后语
const xiehouyuManager = new IdiomsManager(IDIOM_TYPE.xiehouyu);
xiehouyuManager.run("大海捞针——没处寻");
```

## 📁 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主页面（重定向到英文版本）
│   │   ├── en_US/            # 英文版本页面
│   │   ├── layout.tsx        # 全局布局
│   │   └── globals.css       # 全局样式
│   ├── components/
│   │   └── ui/               # shadcn/ui 组件库
│   ├── data/
│   │   ├── en_US/
│   │   │   ├── chengyu/      # 成语数据（JSON格式）
│   │   │   └── xiehouyu/     # 歇后语数据
│   │   ├── zh_CN/            # 中文数据目录
│   │   ├── language.ts       # 语言配置
│   │   └── simple.ts         # 简化数据
│   ├── hooks/                # 自定义 Hooks
│   ├── lib/                  # 工具函数
│   ├── shared/               # 共享模块
│   └── types/                # TypeScript 类型定义
├── public/
│   └── chengyu/              # 成语配图资源
├── scripts/
│   ├── IdiomsManager.ts      # 成语管理脚本
│   └── autoGen/              # 自动生成工具
├── next.config.js            # Next.js 配置
└── package.json              # 项目依赖
```

## 🎨 数据结构

### 成语数据格式

每个成语包含以下字段：

```typescript
{
  id: number,
  original: string,              // 成语原文（中文）
  translation: string,           // 英文翻译
  imageUrl: string,              // 图片路径
  source: string,                // 出处说明
  meaning: string,               // 含义解释
  usage: string,                 // 用法说明
  imgPositivePrompt: string,     // 图片生成正向提示词
  imgNegativePrompt: string,     // 图片生成负向提示词
  originalCountry: string        // 原产国
}
```

### 歇后语数据格式

每个歇后语包含前半句谜面和后半句谜底的中英文对照。

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ using Next.js & shadcn/ui