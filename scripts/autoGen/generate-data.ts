/**
 * 数据生成模块
 * 调用 LLM 生成歇后语的结构化数据
 */
import fs from 'node:fs';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { CONFIG, IdiomInput, GeneratedIdiomData } from "./config";

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const model = deepseek('deepseek-chat');

/**
 * 为单个成语或歇后语生成完整数据
 */
export async function generateIdiomData(
  idiom: IdiomInput,
  id: number,
): Promise<GeneratedIdiomData> {
  const typeLabel = idiom.type === 'chengyu' ? '成语' : '歇后语';
  const display = idiom.type === 'chengyu'
    ? `${idiom.original}`
    : `${idiom.original} — ${idiom.originalMeaning}`;

  console.log(`\n📝 生成数据 [${typeLabel}]: ${display}`);

  try {
    const response = await generateText({
      model,
      prompt: CONFIG.dataPromptTemplate(idiom),  // 根据输入生成提示词
    });

    const textContent = response.content.find(i => i.type === 'text')?.text || '';

    // 解析 JSON 响应
    let jsonData: GeneratedIdiomData;
    try {
      // 清理可能的 markdown 代码块标记
      const cleanedContent = textContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      jsonData = JSON.parse(cleanedContent);
    } catch (error) {
      console.error("❌ JSON 解析失败:", error);
      console.error("原始响应:", textContent);
      throw new Error("Failed to parse LLM response as JSON");
    }

    // 验证必要字段
    if (
      !jsonData.original ||
      !jsonData.translation ||
      !jsonData.source ||
      !jsonData.meaning ||
      !jsonData.usage
    ) {
      console.error("❌ 缺少必要字段:", jsonData);
      throw new Error("Missing required fields in generated data");
    }

    // 对于歇后语，必须有 chineseMeaning 和 englishMeaning
    if (idiom.type === 'xiehouyu') {
      if (!jsonData.translationMeaning || !jsonData.originalMeaning) {
        console.error("❌ 歇后语缺少必要字段:", jsonData);
        throw new Error("Missing required fields for xiehouyu type");
      }
    }

    // 对于成语，chineseMeaning 和 englishMeaning 必须为 null
    if (idiom.type === 'chengyu') {
      if (jsonData.translationMeaning !== null || jsonData.originalMeaning !== null) {
        console.warn("⚠️  成语字段不为 null，将设置为 null");
        jsonData.translationMeaning = undefined;
        jsonData.originalMeaning = undefined;
      }
    }

    const generatedData: GeneratedIdiomData = {
      id,
      original: jsonData.original,
      originalMeaning: jsonData.originalMeaning || undefined,
      translation: jsonData.translation,
      translationMeaning: jsonData.translationMeaning || undefined,
      imageUrl: "", // 图片路径稍后生成
      source: jsonData.source,
      meaning: jsonData.meaning,
      usage: jsonData.usage,
      imgPositivePrompt: jsonData.imgPositivePrompt,
      imgNegativePrompt: jsonData.imgNegativePrompt,
      originalCountry: "China", // 默认为中国
    };

    console.log(`✅ 数据生成成功`);
    console.log(`   原文: ${generatedData.original}`);
    console.log(`   英文: ${generatedData.translation}`);

    return generatedData;
  } catch (error) {
    console.error(`❌ 生成数据失败:`, error);
    throw error;
  }
}

/**
 * 批量生成歇后语数据
 */
export async function generateBatchIdiomData(
  idioms: IdiomInput[],
  startId = 1,
): Promise<GeneratedIdiomData[]> {
  const results: GeneratedIdiomData[] = [];

  for (let i = 0; i < idioms.length; i++) {
    const idiom = idioms[i];
    const id = startId + i;

    try {
      const data = await generateIdiomData(idiom, id);
      results.push(data);

      // 避免请求过快
      if (i < idioms.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ 跳过 ${idiom.original}，生成失败`);
      // 继续处理下一个
    }
  }

  return results;
}
