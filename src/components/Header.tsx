'use client';

import { BookOpen, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "./SearchBar";
import { useMemo, useState, useTransition } from "react";
import { xiehouyuData } from "@/data/xiehouyu";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // 搜索过滤逻辑
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return xiehouyuData;

    const query = searchQuery.toLowerCase().trim();
    return xiehouyuData.filter((xiehouyu) => {
      return (
        xiehouyu.chinese.toLowerCase().includes(query) ||
        xiehouyu.chineseMeaning.toLowerCase().includes(query) ||
        xiehouyu.english.toLowerCase().includes(query) ||
        xiehouyu.englishMeaning.toLowerCase().includes(query) ||
        xiehouyu.meaning.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
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
  );
}

export default Header;
