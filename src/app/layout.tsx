import { METADATA } from "@/shared/metadata";
import PageLayout, { PageLayoutProps } from "@/components/PageLayout";
import idiomList from '@/data/en_US/xiehouyu/simple.json';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = { ...METADATA };

export const BaseUrl = "/en_US/xiehouyu"; // 定义基础 URL，方便后续使用和维护

const layoutProps: Omit<PageLayoutProps, "children"> = {
  footerProps: {
    name: "Chinese Idioms Collection",
    description: "Preserving cultural heritage",
    extra: "Bilingual Experience",
    contactTip: "If you have any suggestions or ideas, please contact me:",
  },
  noticeBtnText: "Continuously Updating...",
  idiomCardContext: {
    idiomList,
    baseUrl: BaseUrl,
    maxLength: idiomList.length,
    imageErrorText: "Image failed to load",
    meaningTitle: "Meaning & Usage",
    culturalBackground: "Origin & Story",
  },
  confirmText: 'Go directly to the last location you visited?',
  headerProps: {
    baseUrl: BaseUrl,
    simpleData: idiomList,
    title: '歇后语英文译解',
    subTitle: 'Chinese Two-Part Allegorical Sayings',
    noResultsText: "No matching idioms found",
    searchPlaceholder: "Search idioms in Chinese and English...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <PageLayout {...layoutProps}>{children}</PageLayout>
        <Toaster />
      </body>
    </html>
  );
}
