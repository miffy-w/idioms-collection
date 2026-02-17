"use client"

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const divRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    function click(e: MouseEvent) {
      if (!divRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.body.addEventListener('click', click, false);

    return () => {
      document.body.removeEventListener('click', click, false);
    }
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="relative z-50"
      ref={divRef}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <Button
        size="icon"
        variant="ghost"
        aria-label="Toggle theme"
        className="relative cursor-pointer"
      >
        {theme === 'dark' && <Moon className="h-5 w-5" />}
        {theme === 'light' && <Sun className="h-5 w-5" />}
        {theme === 'system' && <Monitor className="h-5 w-5" />}
      </Button>

      {/* Dropdown menu */}
      <div className={clsx(
        "absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-popover border border-border/50 transition-all duration-200 z-50",
        showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}>
        <div className="py-1">
          <button
            onClick={() => setTheme('light')}
            className={`flex cursor-pointer items-center w-full px-3 py-2 text-sm hover:bg-accent/50 transition-colors ${
              theme === 'light' ? 'bg-accent/80' : ''
            }`}
          >
            <Sun className="h-4 w-4 mr-2" />
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex cursor-pointer items-center w-full px-3 py-2 text-sm hover:bg-accent/50 transition-colors ${
              theme === 'dark' ? 'bg-accent/80' : ''
            }`}
          >
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`flex cursor-pointer items-center w-full px-3 py-2 text-sm hover:bg-accent/50 transition-colors ${
              theme === 'system' ? 'bg-accent/80' : ''
            }`}
          >
            <Monitor className="h-4 w-4 mr-2" />
            System
          </button>
        </div>
      </div>
    </div>
  )
}
