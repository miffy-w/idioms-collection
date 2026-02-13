"use client"

import { useState, useMemo, useDeferredValue, useTransition } from 'react'
import { xiehouyuData } from '@/data/xiehouyu'
import XiehouyuCard from '@/components/XiehouyuCard'
import StructuredData from '@/components/StructuredData'
import SearchBar from '@/components/SearchBar'
import ThemeToggle from '@/components/ThemeToggle'
import { BookOpen, Zap } from 'lucide-react'
import { useLocale } from '@/data'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const deferredQuery = useDeferredValue(searchQuery);
  const [isPending, startTransition] = useTransition()
  const hasQuery = deferredQuery.trim() !== ''

  const data = useLocale();
  console.log("🚀 ~ Home ~ data:", data)
  

  // 搜索过滤逻辑
  const filteredData = useMemo(() => {
    if (!deferredQuery.trim()) return xiehouyuData

    const query = deferredQuery.toLowerCase().trim()
    return xiehouyuData.filter((xiehouyu) => {
      return (
        xiehouyu.chinese.toLowerCase().includes(query) ||
        xiehouyu.chineseMeaning.toLowerCase().includes(query) ||
        xiehouyu.english.toLowerCase().includes(query) ||
        xiehouyu.englishMeaning.toLowerCase().includes(query) ||
        xiehouyu.meaning.toLowerCase().includes(query)
      )
    })
  }, [deferredQuery])

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-purple-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3">
            {/* Top bar with title and theme toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  歇后语英文译解
                </h1>
              </div>
              <ThemeToggle />
            </div>

            {/* Subtitle and search bar */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
              <p className="text-sm text-muted-foreground">
                Chinese Two-Part Allegorical Sayings
              </p>
              <SearchBar
                onSearch={(q) => startTransition(() => setSearchQuery(q))}
                placeholder="Search idioms in Chinese and English..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Intro Section */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Xiehouyu (歇后语) is a unique form of Chinese linguistic art, consisting of two parts: the first part is a vivid metaphor, and the second part is the explanation, clarification, or complement to the first. These statements, imbued with traditional Chinese culture and wisdom, are paired with exquisite illustrations and English translations to help you better understand their deeper meanings.
          </p>
        </div>

        {/* Search Results Count */}
        {hasQuery && (
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredData.length}</span> result{filteredData.length !== 1 ? 's' : ''} for &quot;<span className="font-medium">{deferredQuery}</span>&quot; {isPending && <span className="ml-2 text-sm text-muted-foreground">Searching…</span>}
            </p>
          </div>
        )}

        {/* No Results */}
        {hasQuery && filteredData.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No results found</p>
            <p className="text-sm text-muted-foreground">Try different keywords or clear your search</p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((xiehouyu) => (
            <XiehouyuCard key={xiehouyu.id} xiehouyu={xiehouyu} />
          ))}
        </div>

        {/* Updating Notice */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-rose-100 via-purple-100 to-blue-100 dark:from-rose-950/30 dark:via-purple-950/30 dark:to-blue-950/30 rounded-full border border-rose-200/50 dark:border-rose-800/30">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </div>
            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
              Continuously Updating...
            </span>
          </div>
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
