import { METADATA } from "@/shared/metadata";
import PageLayout, { PageLayoutProps } from "@/components/PageLayout";
import "./globals.css";

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
  headerProps: {
    title: '歇后语/成语英文译解',
    subTitle: 'Chinese Idioms Collection',
    noResultsText: "No matching idioms found",
    searchPlaceholder: "Search idioms in Chinese and English...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <PageLayout {...layoutProps}>{children}</PageLayout>
      </body>
    </html>
  );
}
