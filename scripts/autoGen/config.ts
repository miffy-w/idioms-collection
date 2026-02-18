import {
  generateChengyuPrompt,
  generateProverbPrompt,
  generateXiehouyuPrompt,
  generateImagePromptByChengyu,
  generateImagePromptByXiehouyu,
} from './utils/prompts';
import { IdiomItem, IdiomType, IDIOM_TYPE } from '@/types';

/**
 * 自动化脚本配置文件
 * 用于批量生成成语和歇后语数据和图片
*/
export type GeneratedIdiomData = IdiomItem;

export interface IdiomInput {
  original: string;
  originalMeaning?: string; // 成语没有此字段，歇后语有
  type: IdiomType; // 新增类型字段
}

export const CONFIG = {
  getChineseIdiomType: (type: IdiomType): string => {
    switch (type) {
      case IDIOM_TYPE.chengyu:
        return '成语';
      case IDIOM_TYPE.xiehouyu:
        return '歇后语';
      default:
        return '谚语';
    }
  },

  // 数据生成提示词模板
  dataPromptTemplate: (idiom: IdiomInput): string => {
    switch (idiom.type) {
      case IDIOM_TYPE.chengyu:
        return generateChengyuPrompt(idiom.original);
      case IDIOM_TYPE.xiehouyu:
        return generateXiehouyuPrompt(idiom.original, idiom.originalMeaning || '');
      default:
        return generateProverbPrompt(idiom.original);
    }
  },

  // 图片生成提示词模板
  imagePromptTemplate: (idiom: IdiomInput, generated: IdiomItem): string => {
    // 如果已经生成了提示词，之间使用AI给的提示词
    if (generated.imgPositivePrompt) return generated.imgPositivePrompt;

    if (idiom.type === IDIOM_TYPE.xiehouyu) {
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
