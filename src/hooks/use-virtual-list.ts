import { useCallback, useEffect, useRef, useState } from "react";

type UseVirtualListOptions = {
  containerRef?: React.RefObject<HTMLElement | null>;
  itemCount: number;
  itemHeight: number; // 固定高度虚拟滚动
  overscan?: number; // 额外渲染的项数，默认 3
};

type Range = {
  start: number;
  end: number;
  offset: number; // top offset for the inner spacer
  totalHeight: number;
};

function getScrollTop(container: HTMLElement | Window) {
    if (!container) return 0;
    if (container === window)
    return window.scrollY || window.pageYOffset || 0;
    return (container as HTMLElement).scrollTop;
}

function getClientHeight(container: HTMLElement | Window) {
    if (!container) return 0;
    if (container === window) return window.innerHeight || 0;
    return (container as HTMLElement).clientHeight;
}

/**
 * 简单的固定高度虚拟列表 Hook。
 * - 使用 `containerRef` 指定滚动容器（不传则使用 `window`）
 * - 返回可渲染的起止索引与内层容器偏移
 */
export function useVirtualList(options: UseVirtualListOptions) {
  const { containerRef, itemCount, itemHeight, overscan = 3 } = options;

  const frameRef = useRef<number | null>(null);
  const [range, setRange] = useState<Range>(() => ({
    start: 0,
    end: Math.max(
      0,
      Math.min(
        itemCount - 1,
        Math.floor((window.innerHeight || 0) / itemHeight),
      ),
    ),
    offset: 0,
    totalHeight: itemCount * itemHeight,
  }));

  useEffect(() => {
    const container = containerRef?.current ?? window;

    function updateRange() {
      const scrollTop = getScrollTop(container);
      const clientHeight = getClientHeight(container);

      const visibleStart = Math.floor(scrollTop / itemHeight);
      const visibleEnd = Math.ceil((scrollTop + clientHeight) / itemHeight) - 1;

      const start = Math.max(0, visibleStart - overscan);
      const end = Math.min(itemCount - 1, visibleEnd + overscan);

      const offset = start * itemHeight;

      setRange({ start, end, offset, totalHeight: itemCount * itemHeight });
    }

    function onScroll() {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        updateRange();
      });
    }

    // 初始计算
    updateRange();

    if (container && container !== window) {
      (container as HTMLElement).addEventListener("scroll", onScroll, {
        passive: true,
      });
      window.addEventListener("resize", onScroll, { passive: true });
    } else if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      if (container && container !== window) {
        (container as HTMLElement).removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      } else if (typeof window !== "undefined") {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    // 注意：我们希望在 itemCount 或高度变化时重新计算，因此把它们作为依赖
  }, [containerRef, itemCount, itemHeight, overscan]);

  // 外部 API：滚动到某个索引
  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "auto") => {
      const clamped = Math.max(0, Math.min(itemCount - 1, Math.floor(index)));
      const top = clamped * itemHeight;
      const container = containerRef?.current ?? window;

      if (!container) return;
      if (container === window) {
        window.scrollTo({ top, behavior });
      } else {
        (container as HTMLElement).scrollTo({ top, behavior });
      }
    },
    [itemHeight, itemCount],
  );

  return {
    scrollToIndex,
    end: range.end,
    start: range.start,
    offset: range.offset,
    totalHeight: range.totalHeight,
    visibleCount: Math.max(0, range.end - range.start + 1),
  };
}

export default useVirtualList;
