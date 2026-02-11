import type { Metadata } from 'next';
import { xiehouyuData } from '@/data/xiehouyu';
import XiehouyuCard from '@/components/XiehouyuCard';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Chinese Idioms Collection | 歇后语英文译解',
  description: 'Explore traditional Chinese two-part allegorical sayings (歇后语) with English translations, beautiful illustrations, and detailed cultural insights. Learn about the origins and meanings of classic Chinese idioms like "A frog in a well" and "Drawing feet on a snake".',
  keywords: 'Chinese idioms, 歇后语, Chinese proverbs, Xiehouyu, cultural translations, bilingual, Chinese culture, traditional wisdom, Chinese language learning, allegorical sayings',
  openGraph: {
    title: 'Chinese Idioms Collection | Classic Sayings with English Translations',
    description: 'Discover traditional Chinese wisdom through beautifully illustrated two-part allegorical sayings. Each idiom comes with English translations and detailed cultural backgrounds.',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Chinese Idioms Collection - Explore Traditional Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinese Idioms Collection | Explore Traditional Wisdom',
    description: 'Discover classic Chinese two-part allegorical sayings with beautiful illustrations and English translations.',
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-purple-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              歇后语英文译解
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Chinese Two-Part Allegorical Sayings | Explore Traditional Wisdom
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Intro Section */}
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Xiehouyu (歇后语) is a unique form of Chinese linguistic art, consisting of two parts: the first part is a vivid metaphor, and the second part is the explanation, clarification, or complement to the first. These statements, imbued with traditional Chinese culture and wisdom, are paired with exquisite illustrations and English translations to help you better understand their deeper meanings.
          </p>
        </div>

        {/* Updating Notice */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 dark:from-rose-950/30 dark:via-purple-950/30 dark:to-blue-950/30 rounded-full border border-rose-200/50 dark:border-rose-800/30">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </div>
            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
              Continuously Updating...
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {xiehouyuData.map((xiehouyu) => (
            <XiehouyuCard key={xiehouyu.id} xiehouyu={xiehouyu} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chinese Idioms Collection
              </p>
              <p className="text-sm text-muted-foreground">
                 Preserving cultural heritage
              </p>
              <p className="text-sm text-muted-foreground">
                  Bilingual Experience
              </p>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                If you have any suggestions or ideas, please contact me: <a href="mailto:wmh.wang@outlook.com" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors underline decoration-2 underline-offset-2">wmh.wang@outlook.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
