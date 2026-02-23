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
