export const IDIOM_TYPE = {
  chengyu: 'chengyu',
  xiehouyu: 'xiehouyu',
  proverb: 'proverb',
} as const;

export type IdiomType = typeof IDIOM_TYPE[keyof typeof IDIOM_TYPE];

export interface IdiomItem {
  id: number;
  /** 原始 */
  original: string;
  /** 解释 */
  originalMeaning?: string;
  /** 译文,对应 original */
  translation: string;
  /** 译文解释，对应 originalMeaning */
  translationMeaning?: string;
  /** 所属国家 */
  originalCountry: string;
  /** 出处 */
  source: string;
  /** 意义 */
  meaning: string;
  /** 使用场景 */
  usage: string;
  /** 图片 URL */
  imageUrl: string;
  /** 图片正面提示词 */
  imgPositivePrompt?: string;
  /** 图片负面提示词 */
  imgNegativePrompt?: string;
}

export interface SimpleIdiomItem {
  id: number;
  o: string;
  t: string;
  om?: string;
  tm?: string;
}
