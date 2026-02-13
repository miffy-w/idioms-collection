'use client'
import Footer, { FooterProps } from "./Footer";
import Header from "./Header";
import { Inspector } from "react-dev-inspector";
import ThemeProvider from "@/components/ThemeProvider";
import UpdatingNotice from "./UpdatingNotice";
import { IdiomContextProvider, CardContextType } from "./IdiomCard";

export interface PageLayoutProps {
  children: React.ReactNode;
  footerProps: FooterProps;
  description: React.ReactNode;
  noticeBtnText: string;
  idiomCardContext: CardContextType;
}

function PageLayout({
  children,
  footerProps,
  description,
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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-rose-50 to-purple-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
        <Header />

        <main className="container mx-auto px-4 pt-6 pb-12">
          {/* Intro Section */}
          <div className="mb-6 text-center max-w-3xl mx-auto">
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </div>
          </div>

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
