import { useEffect, useMemo, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return setIsMobile(false);
    }

    const ua = window.navigator.userAgent;
    const mobileKeywords =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

    if (mobileKeywords.test(ua)) {
      setIsMobile(true);
    }

    // 再看屏幕尺寸（兜底）
    else if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return isMobile;
}
