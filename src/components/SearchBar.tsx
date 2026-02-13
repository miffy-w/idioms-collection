"use client"

import { SimpleIdiomItem } from '@/types'
import { Search } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'

interface SearchBarProps {
  placeholder?: string
  simpleData?: SimpleIdiomItem[]; // 可选的简化数据列表
}

export default function SearchBar({ placeholder, simpleData }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // 搜索过滤逻辑
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return []; // 如果搜索查询为空，返回原始数据

    const query = searchQuery.toLowerCase().trim();
    return simpleData?.filter((xiehouyu) => {
      return (
        xiehouyu.original.toLowerCase().includes(query) ||
        xiehouyu.originalMeaning?.toLowerCase().includes(query) ||
        xiehouyu.translation.toLowerCase().includes(query) ||
        xiehouyu.translationMeaning?.toLowerCase().includes(query)
      ); // 根据需要添加更多字段
    }) || [];
  }, [searchQuery]);

  return (
    <div className="relative w-full md:w-80 lg:w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md text-sm"
      />
    </div>
  )
}
