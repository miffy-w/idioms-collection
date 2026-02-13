export interface IdiomItem {
  id: number;
  /** 原始 */
  original: string;
  /** 原始含义 */
  originalMeaning?: string;
  /** 译文 */
  translation: string;
  /** 译文含义 */
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
}
