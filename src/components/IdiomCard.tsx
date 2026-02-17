"use client";
import { IdiomItem, SimpleIdiomItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  BookText,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import IdiomsDrawer from "./IdiomsDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

export interface IdiomCardProps {
  data: IdiomItem;
  baseUrl: string;
  imageErrorText?: string;
  meaningTitle?: string;
  simpleList: SimpleIdiomItem[];
  culturalBackground?: string;
}

function IdiomCard({
  data,
  baseUrl,
  imageErrorText,
  meaningTitle,
  simpleList,
  culturalBackground,
}: IdiomCardProps) {
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Card Image */}
        <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
            <Image
              src={data.imageUrl}
              alt={data.translation}
              fill
              className="object-contain"
              priority={true}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
                <Loader2 className="w-8 h-8 text-muted-foreground/50 animate-spin" />
              </div>
            )}
            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 gap-2">
                <AlertCircle className="w-10 h-10 text-rose-500/70" />
                {!!imageErrorText && (
                  <span className="text-sm text-muted-foreground">
                    {imageErrorText}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Card Info */}
          <div className="p-6 space-y-4">
            {/* Chinese Part */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground dark:text-white">
                {data.original}
              </h2>
              <p className="text-lg text-muted-foreground">
                <span className={clsx(
                  !isMobile && "blur-xs hover:blur-none transition-all duration-300 cursor-help"
                )}>
                  {data.originalMeaning}
                </span>
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

            {/* English Part */}
            <div className="space-y-2">
              <p className="text-base font-medium text-foreground/90 dark:text-white/90 leading-relaxed">
                {data.translation}
              </p>
              <p className="text-base text-muted-foreground italic">
                <span className={clsx(
                  !isMobile && "blur-xs hover:blur-none transition-all duration-300 cursor-help"
                )}>
                  {data.translationMeaning}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div className="backdrop-blur-md rounded-lg p-5 bg-white/10 dark:bg-black/10 border border-amber-400/55 dark:border-black/20">
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-4">
              <BookText className="inline mr-2" />
              {culturalBackground}
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {data.source}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-4">
              💡 {meaningTitle}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {data.meaning}
            </p>

            <p className="text-sm text-muted-foreground mt-4 leading-relaxed whitespace-pre-line">
              {data.usage}
            </p>
          </div>
        </div>

        {/* Divider */}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {data.id > 0 && (
          <Link replace href={`${baseUrl}/${data.id === 1 ? "" : data.id - 1}`}>
            <button className="flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-rose-500 to-purple-500 text-white font-medium hover:from-rose-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        )}
        <IdiomsDrawer baseUrl={baseUrl} idiomList={simpleList} />
        {data.id < simpleList.length && (
          <Link replace href={`${baseUrl}/${data.id + 1}`}>
            <button className="flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default IdiomCard;
