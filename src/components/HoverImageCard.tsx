"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import clsx from "clsx";

export interface HoverImageCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  actionButtonText?: string;
  imageAlt?: string;
}

export default function HoverImageCard({
  href,
  image,
  title,
  description,
  imageAlt = title,
  actionButtonText = "Learn more",
}: HoverImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-135 rounded-lg overflow-hidden bg-white dark:bg-slate-950 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative grow overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-700 aspect-video">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={clsx(
            "absolute inset-0 transition-opacity duration-300",
            isMobile || isHovered ? "opacity-100" : "opacity-0",
          )}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          {/* Gradient from transparent to darker bottom */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black dark:from-transparent dark:via-black/50 dark:to-black" />

          {/* Content - appears on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
            <p className="text-md mb-4">{description}</p>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="px-4 py-6 bg-white dark:bg-slate-950 items-center flex justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 truncate">
          {title}
        </h3>

        <Link href={href}>
          <Button
            variant="secondary"
            className="cursor-pointer"
          >
            {actionButtonText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
