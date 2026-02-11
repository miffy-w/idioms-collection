"use client"

import { useState } from "react"
import Image from "next/image"
import { Xiehouyu } from '@/data/xiehouyu'
import SourceDialog from './SourceDialog'
import { BookOpenIcon } from 'lucide-react'

interface XiehouyuCardProps {
  xiehouyu: Xiehouyu;
}

export default function XiehouyuCard({ xiehouyu }: XiehouyuCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-xl hover:scale-105">
        <div
          className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Image
            src={xiehouyu.imageUrl}
            alt={xiehouyu.chinese}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
              <BookOpenIcon className="w-5 h-5" />
              <span className="text-sm font-medium">View More</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {/* 中文部分 */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground dark:text-white">
              {xiehouyu.chinese}
            </h3>
            <p className="text-base text-muted-foreground">
                <span className="blur-xs hover:blur-none transition-all duration-300 cursor-help">
                {xiehouyu.chineseMeaning}
              </span>
              </p>
          </div>

          {/* 分隔线 */}
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

          {/* 英文部分 */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground/90 dark:text-white/90 leading-relaxed">
              {xiehouyu.english}
            </p>
            <p className="text-sm text-muted-foreground italic">
              <span className="blur-xs hover:blur-none transition-all duration-300 cursor-help">
                {xiehouyu.englishMeaning}
              </span>
            </p>
          </div>
        </div>
      </div>

      <SourceDialog
        xiehouyu={xiehouyu}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  )
}
