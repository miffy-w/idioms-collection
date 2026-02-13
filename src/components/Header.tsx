import { BookOpen, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "./SearchBar";
import { SimpleIdiomItem } from "@/types";

interface HeaderProps {
  simpleData?: SimpleIdiomItem[]; // 可选的简化数据列表
}

function Header({ simpleData }: HeaderProps) {
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
              simpleData={simpleData}
              placeholder="Search idioms in Chinese and English..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
