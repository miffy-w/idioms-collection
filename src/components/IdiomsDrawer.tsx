"use client";
import { SimpleIdiomItem } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MenuSquare } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

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

  const selectedIndex = useMemo(() => {
    const id = pathname.replace(`${baseUrl}/`, "");
    return idiomSortedList.findIndex((item) => item.id === Number(id));
  }, [idiomSortedList, pathname, baseUrl]);

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
            <IdiomList
              items={idiomSortedList}
              itemHeight={56}
              height={400}
              selectedIndex={selectedIndex}
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
  baseUrl?: string;
  className?: string;
  virtual?: boolean;
  isSelected?: (item: SimpleIdiomItem) => boolean;
  onClickItem?: (item: SimpleIdiomItem) => void;
  selectedIndex?: number;
}

export function IdiomList({
  items,
  baseUrl,
  isSelected,
  className,
  virtual = true,
  itemHeight = 56,
  onClickItem,
  height = 400,
  selectedIndex,
}: VirtualListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex >= 0 && containerRef.current) {
      const targetTop = selectedIndex * itemHeight;
      const containerHeight = height;
      const scrollPosition = targetTop - containerHeight / 2 + itemHeight / 2;
      containerRef.current.scrollTop = Math.max(0, scrollPosition);
      setScrollTop(Math.max(0, scrollPosition));
    }
  }, [selectedIndex, itemHeight, height]);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const buffer = 5;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + buffer * 2,
  );
  const visibleItems = virtual ? items.slice(startIndex, endIndex + 1) : items;

  return (
    <div
      ref={containerRef}
      style={virtual ? { height, overflow: "auto" } : {}}
      onScroll={
        virtual
          ? (e) => setScrollTop((e.target as HTMLDivElement).scrollTop)
          : void 0
      }
      className={clsx("w-full", className)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((it, idx) => {
          const realIndex = startIndex + idx;
          const selected = isSelected?.(it);
          const dom = (
            <div
              style={{
                height: itemHeight,
                ...(virtual
                  ? {
                      position: "absolute",
                      top: realIndex * itemHeight,
                      left: 0,
                      right: 0,
                    }
                  : {}),
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
                  "w-10 text-sm",
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

          return baseUrl ? (
            <Link key={it.id} href={`${baseUrl}/${it.id}`}>
              {dom}
            </Link>
          ) : (
            dom
          );
        })}
      </div>
    </div>
  );
}
