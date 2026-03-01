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

            <div className="flex items-center gap-x-1">
              <Link
                href="https://github.com/miffy-w/idioms-collection"
                rel="noopener noreferrer"
                target="_blank"
              >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z" />
              </svg>
            </Link>
            <ThemeToggle />
            </div>
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
