import type { Metadata } from "next";

export const METADATA: Metadata = {
  title: {
    default: "Chinese Idioms Collection | 歇后语英文译解",
    template: "%s | Chinese Idioms Collection",
  },
  description:
    "Explore traditional Chinese two-part allegorical sayings (歇后语) with English translations and cultural insights. Discover the wisdom behind classic Chinese idioms, complete with their historical origins and meanings.",
  keywords: [
    "Chinese idioms",
    "Xiehouyu",
    "Chinese proverbs",
    "Chinese sayings",
    "cultural translations",
    "bilingual",
    "Chinese culture",
    "traditional wisdom",
    "Chinese language learning",
    "allegorical sayings",
  ],
  authors: [{ name: "Chinese Culture Team" }],
  creator: "Chinese Idioms Collection",
  publisher: "Chinese Idioms Collection",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Chinese Idioms Collection | Explore Traditional Wisdom",
    description:
      "Discover classic Chinese two-part allegorical sayings (歇后语) with beautiful illustrations and English translations. Learn about their origins, meanings, and cultural significance.",
    url: "https://idioms-collection.vaste.top",
    siteName: "Chinese Idioms Collection",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Chinese Idioms Collection - Explore Traditional Wisdom",
      },
    ],
  },
  //   twitter: {
  //     card: "summary_large_image",
  //     title: "Chinese Idioms Collection | Explore Traditional Wisdom",
  //     description:
  //       "Discover classic Chinese two-part allegorical sayings (歇后语) with beautiful illustrations and English translations. Learn about their origins, meanings, and cultural significance.",
  //     images: ["/favicon.png"],
  //   },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  //   verification: {
  //     google: "your-google-verification-code",
  //   },
  alternates: {
    canonical: "https://idioms-collection.vaste.top",
  },
};
