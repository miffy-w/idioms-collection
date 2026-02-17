import { BookOpen } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "./SearchBar";
import Link from "next/link";

export interface HeaderProps {
  title: string;
  subTitle: string;

  searchPlaceholder: string;
  noResultsText: string;
}

function Header({
  title,
  subTitle,
  searchPlaceholder,
  noResultsText,
}: HeaderProps) {
  return (
    <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Top bar with title and theme toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              <Link href="/">
                <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {title}
                </h1>
              </Link>
            </div>
            <ThemeToggle />
          </div>

          {/* Subtitle and search bar */}
          <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
            <p className="text-sm text-muted-foreground">{subTitle}</p>
            <SearchBar
              noResultsText={noResultsText}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
