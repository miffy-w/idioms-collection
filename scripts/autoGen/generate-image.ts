/**
 * 图片生成模块
 * 调用图像生成 API 生成歇后语配图
 */
import axios from "axios";
import path from "path";
import sharp from "sharp";
import { genImg } from './utils/genImg';
import { CONFIG, IdiomInput, GeneratedIdiomData } from "./config";
import { IDIOM_TYPE } from "@/types";
import { sleep } from "@/lib/utils";

/**
 * 生成单个图片
 */
export async function generateIdiomImage(
  idiom: IdiomInput,
  data: GeneratedIdiomData,
  filename: string,
) {
  const typeLabel = CONFIG.getChineseIdiomType(idiom.type);
  console.log(`\n🎨 生成图片 [${typeLabel}]: ${idiom.original} ${idiom.originalMeaning ?? ''}`);

  const prompt = CONFIG.imagePromptTemplate(idiom, data);

  try {
    const image = await genImg({
      prompt,
      type: 'doubao',
      negative_prompt: data.imgNegativePrompt,
    });

    // 下载图片
    await sleep(2000);

    const imageData = await axios.get(image.url, {
      responseType: "arraybuffer",
      timeout: 30000,
      // proxy: false,
    }).then(r => {
      console.log(`✅ 图片下载成功: ${image.url}`);
      return r.data;
    });

    /** 如果图片小于800kb，则直接保存文件，不再压缩 */
    if (imageData.length < 800 * 1024) {
      return await sharp(imageData).toFile(filename);
    }

    // 图片压缩
    const r = await sharp(imageData).webp({
      effort: 2,
      quality: 90,
    }).toFile(filename);
    
    return r;
  } catch (error) {
    console.error(`❌ 图片生成异常:`, error);
    throw error;
  }
}

/**
 * 批量生成图片（串行，避免并发过多）
 */
export async function generateBatchIdiomImages(
  idioms: IdiomInput[],
  dataList: GeneratedIdiomData[],
  saveDir: string,
) {
  const result: GeneratedIdiomData[] = [];

  for (let i = 0; i < idioms.length; i++) {
    const idiom = idioms[i];
    const data = dataList[i];
    const om = idiom.originalMeaning;
    const filename = `${idiom.original}${om ? '——' + om : ''}.webp`;

    const isXiehouyu = idiom.type === IDIOM_TYPE.xiehouyu;
    const imgDir = !isXiehouyu ? `${saveDir}/${idiom.type}` : saveDir;
    const outputPath = path.join(imgDir, filename);

    try {
      await generateIdiomImage(idiom, data, outputPath);
      // 更新数据中的图片路径
      data.imageUrl = !isXiehouyu ? `/${idiom.type}/${filename}` : `/${filename}`;

      result.push(data);    // 只有生成图片成功的才录入

      // 避免请求过快
      if (i < idioms.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ 跳过 ${idiom.original}，图片生成失败`);
    }
  }

  return result;
}
