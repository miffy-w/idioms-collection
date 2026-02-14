"use client";
import { SimpleIdiomItem } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MenuSquare } from "lucide-react";
import clsx from "clsx";

export interface IdiomsDrawerProps {
  baseUrl: string;
  idiomList: SimpleIdiomItem[];
}

function IdiomsDrawer({ baseUrl, idiomList }: IdiomsDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const idiomSortedList = useMemo(() => {
    return idiomList.toSorted((a, b) => a.id - b.id);
  }, [idiomList]);

  return (
    <>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuSquare className="h-4 w-4" />
      </Button>
      <Drawer onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen}>
        <DrawerContent>
        <DrawerTitle hidden>Idioms List</DrawerTitle>
          <div className="p-4">
            <VirtualList
              items={idiomSortedList}
              itemHeight={56}
              height={400}
              onClickItem={(it) => {
                router.push(`${baseUrl}/${it.id}`);
                setIsDrawerOpen(false);
              }}
              isSelected={(it) => {
                return pathname === `${baseUrl}/${it.id}`;
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default IdiomsDrawer;

interface VirtualListProps {
  items: SimpleIdiomItem[];
  itemHeight?: number;
  height?: number;
  isSelected?: (item: SimpleIdiomItem) => boolean;
  onClickItem?: (item: SimpleIdiomItem) => void;
}

export function VirtualList({
  items,
  isSelected,
  itemHeight = 56,
  onClickItem,
  height = 400,
}: VirtualListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const buffer = 5;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + buffer * 2,
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      style={{ height, overflow: "auto" }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      className="w-full"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((it, idx) => {
          const realIndex = startIndex + idx;
          const selected = isSelected?.(it);
          return (
            <div
              style={{
                position: "absolute",
                top: realIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
              key={it.id}
              className={clsx(
                "flex items-center gap-3 border-b px-3 cursor-pointer",
                !!selected && "text-fuchsia-500",
              )}
              onClick={() => {
                if (!selected) {
                  onClickItem?.(it);
                }
              }}
            >
              <div
                className={clsx(
                  "w-11 text-sm",
                  !!selected ? "text-fuchsia-400" : "text-muted-foreground",
                )}
              >
                {it.id}
              </div>
              <div className="text-sm w-0 grow font-medium truncate">
                {it.t}
              </div>
              <div
                className={clsx(
                  "text-sm",
                  !!selected ? "text-fuchsia-400" : "text-muted-foreground",
                )}
              >
                {it.o}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
