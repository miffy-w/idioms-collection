"use client";
import React, { useEffect, useRef } from "react";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";
import { Inspector } from "react-dev-inspector";
import ThemeProvider from "@/components/ThemeProvider";
import UpdatingNotice from "./UpdatingNotice";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { IdiomContextProvider, CardContextType } from "./IdiomCard";
import { usePathname, useRouter } from "next/navigation";

export interface PageLayoutProps {
  children: React.ReactNode;
  footerProps: FooterProps;
  noticeBtnText: string;
  headerProps: HeaderProps;
  idiomCardContext: CardContextType;

  confirmText?: string; // 可选的确认提示文本，默认为 "是否直接转到上次您浏览的位置？"
}

const PATH_REG = /\/xiehouyu\/\d+/; // 匹配 /xxx/xiehouyu/xxx 的路径
const LOCAL_STORAGE_KEY = "lastContentPath"; // localStorage 中保存路径的键名

function PageLayout({
  children,
  confirmText,
  footerProps,
  headerProps,
  noticeBtnText,
  idiomCardContext,
}: PageLayoutProps) {
  const isDev = process.env.NODE_ENV === "development";
  const pathname = usePathname();
  const router = useRouter();

  // 保存匹配 /xxx/xiehouyu/xxx 的路径到 localStorage
  useEffect(() => {
    if (!pathname) return;
    try {
      if (PATH_REG.test(pathname)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, pathname);
      }
    } catch (e) {
      // 安全降级：浏览器可能禁用 localStorage
    }
  }, [pathname]);

  // 在首次加载时（当 pathname 可用）检查是否有上次保存的路径，若当前不在 xiehouyu 页面则提示跳转
  useEffect(() => {
    if (!pathname) return;

    let saved: string | null = null;
    let prompted: string | null = null;
    try {
      saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      prompted = sessionStorage.getItem("promptedForLastLocation");
    } catch (e) {
      // ignore
    }

    if (saved && saved !== pathname && !prompted && !PATH_REG.test(pathname)) {
      sessionStorage.setItem("promptedForLastLocation", "true"); // 标记已提示过，避免重复提示
      try {
        setTimeout(() => {
          let isClicked = false;
          toast(
            confirmText ?? "Go directly to the last location you visited?",
            {
              action: {
                label: <ArrowRight className="bg-transparent" />,
                onClick: () => {
                  isClicked = true;
                  router.push(saved);
                },
              },
              onAutoClose() {
                if (!isClicked) {
                  localStorage.removeItem(LOCAL_STORAGE_KEY);
                }
              },
            },
          );
        }, 1200);
      } catch (e) {
        // ignore
      }
    }
  }, [pathname, router, confirmText]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {isDev && <Inspector />}
      <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-rose-50 to-purple-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
        <Header {...headerProps} />

        <main className="container mx-auto px-4 pt-6 pb-12 flex-1">
          <IdiomContextProvider context={idiomCardContext}>
            {/* Single Card Layout */}
            {children}
          </IdiomContextProvider>

          {/* Updating Notice */}
          <UpdatingNotice btnText={noticeBtnText} />
        </main>

        <Footer {...footerProps} />
      </div>
    </ThemeProvider>
  );
}

export default PageLayout;
