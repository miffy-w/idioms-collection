/**
 * 图片生成模块
 * 调用图像生成 API 生成歇后语配图
 */
import axios from "axios";
import path from "path";
import dayjs from "dayjs";
import sharp from "sharp";
import { generateImage, getImageUrl } from './utils/generationImage';
import { CONFIG, IdiomInput, GeneratedIdiomData } from "./config";

/**
 * 生成单个图片
 */
export async function generateIdiomImage(
  idiom: IdiomInput,
  data: GeneratedIdiomData,
  filename: string,
) {
  const typeLabel = idiom.type === "chengyu" ? "成语" : "歇后语";
  console.log(`\n🎨 生成图片 [${typeLabel}]: ${idiom.original}`);

  const prompt = CONFIG.imagePromptTemplate(idiom, data);

  try {
    const response = await generateImage({
      prompt,
      apiKey: process.env.ALI_ACCESS_KEY_ID || '',
    });

    const image = getImageUrl(response);

    // 下载图片
    const imageData = await axios.get(image.url, {
      responseType: "arraybuffer",
      timeout: 30000,
    }).then(r => r.data);

    // 图片压缩
    const r = await sharp(imageData).webp({
      quality: 80,
      effort: 6,
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
  const date = dayjs();
  const second = date.second();

  for (let i = 0; i < idioms.length; i++) {
    const idiom = idioms[i];
    const data = dataList[i];
    const d = dayjs(date.add(second + i, 'second')); // 确保每张图的时间戳不同
    const filename = d.format("YYYY-MM-DD_HH-mm-ss") + '.webp';
    const outputPath = path.join(saveDir, filename);

    try {
      await generateIdiomImage(idiom, data, outputPath);
      data.imageUrl = `/public/${filename}`; // 更新数据中的图片路径

      // 避免请求过快
      if (i < idioms.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ 跳过 ${idiom.original}，图片生成失败`);
    }
  }

  return dataList;
}
