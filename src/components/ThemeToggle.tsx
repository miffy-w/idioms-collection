"use client"

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="relative group z-50">
      <Button
        variant="ghost"
        size="icon"
        className="relative cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === 'dark' && <Moon className="h-5 w-5" />}
        {theme === 'light' && <Sun className="h-5 w-5" />}
        {theme === 'system' && <Monitor className="h-5 w-5" />}
      </Button>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-popover border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
