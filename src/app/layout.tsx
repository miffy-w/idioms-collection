import { METADATA } from "@/shared/metadata";
import PageLayout, { PageLayoutProps } from "@/components/PageLayout";
import idiomList from './en_US/idiomList.json';
import "./globals.css";

export const metadata = { ...METADATA };

const layoutProps: Omit<PageLayoutProps, "children"> = {
  footerProps: {
    name: "Idioms Collection",
    description: "Preserving cultural heritage",
    extra: "Bilingual Experience",
    contactTip: "If you have any suggestions or ideas, please contact me:",
  },
  noticeBtnText: "Continuously Updating...",
  description: `
    Xiehouyu (歇后语) is a unique form of Chinese linguistic art,
    consisting of two parts: the first part is a vivid metaphor, and the
    second part is the explanation, clarification, or complement to the
    first. These statements, imbued with traditional Chinese culture and
    wisdom, are paired with exquisite illustrations and English
    translations to help you better understand their deeper meanings.
  `,
  idiomCardContext: {
    baseUrl: "/en_US",
    maxLength: idiomList.length,
    imageErrorText: "Image failed to load",
    meaningTitle: "Meaning & Usage",
    culturalBackground: "Origin & Story",
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
      </body>
    </html>
  );
}
