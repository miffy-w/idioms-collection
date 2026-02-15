import {
  generateChengyuPrompt,
  generateXiehouyuPrompt,
  generateImagePromptByChengyu,
  generateImagePromptByXiehouyu,
} from './utils/prompts';
import { IdiomItem } from '@/types';

/**
 * 自动化脚本配置文件
 * 用于批量生成成语和歇后语数据和图片
 */

/** 类型：成语或歇后语 */
export type IdiomType = 'chengyu' | 'xiehouyu';

export type GeneratedIdiomData = IdiomItem;

export interface IdiomInput {
  original: string;
  originalMeaning?: string; // 成语没有此字段，歇后语有
  type: IdiomType; // 新增类型字段
}

export const CONFIG = {
  // 数据生成提示词模板
  dataPromptTemplate: (idiom: IdiomInput): string => {
    if (idiom.type === 'xiehouyu') {
      return generateXiehouyuPrompt(idiom.original, idiom.originalMeaning || '');
    } else {
      // 成语
      return generateChengyuPrompt(idiom.original);
    }
  },

  // 图片生成提示词模板
  imagePromptTemplate: (idiom: IdiomInput, generated: IdiomItem): string => {
    // 如果已经生成了提示词，之间使用AI给的提示词
    if (generated.imgPositivePrompt) return generated.imgPositivePrompt;

    if (idiom.type === 'xiehouyu') {
      return generateImagePromptByXiehouyu({
        firstPart: idiom.original,
        secondPart: idiom.originalMeaning || '',
      }, {
        firstPart: generated.translation,
        secondPart: generated.translationMeaning || '',
      });
    } else {
      // 成语
      return generateImagePromptByChengyu(idiom.original, generated.translation);
    }
  },
};
