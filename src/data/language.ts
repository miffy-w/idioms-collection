import xiehouyuSimpleData from "./en_US/xiehouyu/simple.json";
import chengyuSimpleData from "./en_US/chengyu/simple.json";
import xiehouyuData from "./en_US/xiehouyu/data.json";
import chengyuData from "./en_US/chengyu/data.json";

export const LANGUAGE_DATA = {
  en_US: {
    locale: {
      view: 'View',
      learnMore: 'Learn more',
      imageErrorText: "Image failed to load",
      meaningTitle: "Meaning & Usage",
      culturalBackground: "Origin & Story",

      footer: {
        name: "Chinese Idioms Collection",
        description: "Preserving cultural heritage",
        extra: "Bilingual Experience",
        contactTip: "If you have any suggestions or ideas, please contact me:",
      },

      header: {
        title: '歇后语/成语英文译解',
        subTitle: 'Chinese Idioms Collection',
        noResultsText: "No matching idioms found",
        searchPlaceholder: "Search idioms in Chinese and English...",
      },
    },

    idiomTypes: [
      {
        name: 'xiehouyu',
        cover: '/xiehouyu.webp',
        title: 'Xiehouyu (歇后语)',
        description: 'Xiehouyu (歇后语) is a unique form of Chinese linguistic art, consisting of two parts: the first part is a vivid metaphor, and the second part is the explanation, clarification, or complement to the first. These statements, imbued with traditional Chinese culture and wisdom, are paired with exquisite illustrations and English translations to help you better understand their deeper meanings.',

        data: xiehouyuData,
        simpleData: xiehouyuSimpleData,
      }, {
        name: 'chengyu',
        cover: '/chengyu.webp',
        title: 'Chengyu (成语)',
        description: 'Chengyu (成语) are a unique form of Chinese linguistic art, typically consisting of four characters that encapsulate profound meanings derived from historical events, ancient literature, or folklore. These idioms, imbued with traditional Chinese culture and wisdom, are paired with exquisite illustrations and English translations to help you better understand their deeper meanings and cultural context.',

        data: chengyuData,
        simpleData: chengyuSimpleData,
      }
    ],
  },
} as const;
