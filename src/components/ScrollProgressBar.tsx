'use client'
import React, { useEffect, useState } from "react";

const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
     function updateProgress() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const total = docHeight - winHeight;
        const percent = total > 0 ? (scrollTop / total) : 0;
        setProgress(percent);
     }
     window.addEventListener("scroll", updateProgress, { passive: true });
     window.addEventListener("resize", updateProgress, { passive: true });
     updateProgress();
     return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
     };
  }, []);

  return (
     <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress * 100}%`,
          background: "#007aff",
          zIndex: 9999,
          transition: "width 0.2s",
        }}
     />
  );
};

export default ScrollProgressBar;