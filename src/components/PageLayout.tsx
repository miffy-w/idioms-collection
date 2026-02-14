'use client'
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";
import { Inspector } from "react-dev-inspector";
import ThemeProvider from "@/components/ThemeProvider";
import UpdatingNotice from "./UpdatingNotice";
import { IdiomContextProvider, CardContextType } from "./IdiomCard";

export interface PageLayoutProps {
  children: React.ReactNode;
  footerProps: FooterProps;
  noticeBtnText: string;
  headerProps: HeaderProps;
  idiomCardContext: CardContextType;
}

function PageLayout({
  children,
  footerProps,
  headerProps,
  noticeBtnText,
  idiomCardContext,
}: PageLayoutProps) {
  const isDev = process.env.NODE_ENV === "development";

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
