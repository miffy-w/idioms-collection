"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Xiehouyu } from "@/data/xiehouyu"

interface SourceDialogProps {
  xiehouyu: Xiehouyu | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SourceDialog({
  xiehouyu,
  open,
  onOpenChange,
}: SourceDialogProps) {
  if (!xiehouyu) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col overflow-hidden p-0">
        {/* Image Preview */}
        <div className="relative w-full max-h-[40vh] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shrink-0">
          <Image
            src={xiehouyu.imageUrl}
            alt={xiehouyu.chinese}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 80vw"
            priority
          />
        </div>

        <DialogHeader className="p-6 pb-4 shrink-0 border-b">
          <DialogTitle className="text-2xl">
            {xiehouyu.chinese} - Origin Details
          </DialogTitle>
          <DialogDescription className="text-base">
            Learn about the cultural background and historical origins of this traditional Chinese two-part allegorical saying
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full px-6 py-4">
            <div className="space-y-5">
              {/* Idiom Review */}
              <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 rounded-lg p-5 border">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      First Part:
                    </span>
                    <span className="text-lg font-bold">{xiehouyu.chinese}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Second Part:
                    </span>
                    <span className="text-lg font-medium">{xiehouyu.chineseMeaning}</span>
                  </div>
                  <div className="h-px bg-border my-2.5" />
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0 pt-1">
                      English Translation:
                    </span>
                    <p className="text-base flex-1">{xiehouyu.english}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0 pt-1">
                      English Meaning:
                    </span>
                    <p className="text-base italic flex-1">{xiehouyu.englishMeaning}</p>
                  </div>
                </div>
              </div>

              {/* Origin & Story */}
              <div className="space-y-2.5">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="inline-block w-1 h-6 bg-gradient-to-b from-rose-500 via-purple-500 to-blue-500 rounded-full" />
                  Origin & Story
                </h3>
                <div className="bg-muted/50 rounded-lg p-5 leading-relaxed text-base">
                  <p>{xiehouyu.source}</p>
                </div>
              </div>

              {/* Meaning */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  💡 Meaning & Usage
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed whitespace-pre-line">
                  {xiehouyu.meaning}
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
