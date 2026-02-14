"use client";

import { SimpleIdiomItem } from "@/types";
import { Search, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition, useRef, useEffect } from "react";

export interface SearchBarProps {
  placeholder?: string;
  baseUrl: string;
  noResultsText?: string;
  simpleData?: SimpleIdiomItem[]; // 可选的简化数据列表
}

export default function SearchBar({
  placeholder,
  baseUrl,
  simpleData,
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

    const query = searchQuery.toLowerCase().trim();
    return (
      simpleData?.filter((xiehouyu) => {
        return (
          xiehouyu.o.toLowerCase().includes(query) ||
          xiehouyu.om?.toLowerCase().includes(query) ||
          xiehouyu.id.toString().includes(query) ||
          xiehouyu.t.toLowerCase().includes(query) ||
          xiehouyu.tm?.toLowerCase().includes(query)
        );
      }) || []
    );
  }, [searchQuery, simpleData]);

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
            router.push(`${baseUrl}/${item.id}`);
            clearSearch();
          }
        }}
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md text-sm"
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
            {filteredData.slice(0, 12).map((item) => (
              <Link
                key={item.id}
                href={`${baseUrl}/${item.id}`}
                onClick={clearSearch}
              >
                <li className="cursor-pointer px-3 py-2 hover:bg-rose-500/10">
                  <div className="text-sm font-medium">{item.o}</div>
                  <div className="text-xs text-muted-foreground">{item.t}</div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
