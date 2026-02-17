"use client";

import { Search, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import simpleList from '@/data/simple';
import { useMemo, useState, useTransition, useRef, useEffect } from "react";

export interface SearchBarProps {
  placeholder?: string;
  noResultsText?: string;
}

interface SearchData {
  o: string;
  om?: string;
  t: string;
  tm?: string;
  id: number;
  l: string;  // 语言
  c: string;  // 分类
}

export default function SearchBar({
  placeholder,
  noResultsText,
}: SearchBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 搜索过滤逻辑
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const result: SearchData[] = [];  // 最多12条
    const query = searchQuery.toLowerCase().trim();

    for (const item of simpleList) {
      for (const { o, om, t, tm, id } of item.d) {
        if (result.length >= 12) return result;

        if (
          o.toLowerCase().includes(query) ||
          om?.toLowerCase().includes(query) ||
          t.toLowerCase().includes(query) ||
          tm?.toLowerCase().includes(query) ||
          id.toString().includes(query)
        ) {
          result.push({ o, om, t, tm, id, l: item.l, c: om ? 'xiehouyu' : 'chengyu' });
        }
      }
    }

    return result;
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (e.target instanceof Node && !wrapperRef.current.contains(e.target)) {
        clearSearch();
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full md:w-80 lg:w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredData.length > 0) {
            const item = filteredData[0];
            router.push(`/${item.l}/${item.c}/${item.id}`);
            clearSearch();
          }
        }}
        className="w-full placeholder:text-gray-500 pl-10 pr-3 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md text-sm"
      />

      <div
        hidden={!searchQuery}
        className="absolute left-0 right-0 mt-1 z-10 max-h-64 overflow-auto rounded-md border bg-background/95 border-border/50 shadow-lg"
      >
        {isPending && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2 p-4">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        {!isPending && filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2 p-4">
            <Search className="h-6 w-6" />
            <span className="text-sm">
              {noResultsText ?? "No results found"}
            </span>
          </div>
        )}
        {filteredData.length > 0 && !isPending && (
          <ul>
            {filteredData.map((item) => (
              <Link
                key={item.id}
                href={`/${item.l}/${item.c}/${item.id}`}
                onClick={clearSearch}
              >
                <li className="cursor-pointer px-3 py-2 hover:bg-fuchsia-500/30">
                  <div title={item.t} className="text-sm font-medium truncate">{item.t}</div>
                  <div title={item.o} className="text-xs text-muted-foreground truncate">{item.o}</div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
