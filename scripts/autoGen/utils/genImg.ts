import { doubaoGenImg } from "./doubaoGenImg";
import { qianenGenImg } from "./qianwenGenImg";

export interface GenImgOptions {
  type: "doubao" | "qianen";
  prompt: string;
  negative_prompt?: string;
}

export const genImg = async (options: GenImgOptions) => {
  switch (options.type) {
    case "qianen":
      return await qianenGenImg({
        apiKey: process.env.ALI_ACCESS_KEY_ID || "",
        prompt: options.prompt,
        negative_prompt: options.negative_prompt,
      });

    default:
      return await doubaoGenImg({
        // 豆包模型
        apiKey: process.env.DOUBAO_ACCESS_KEY_ID || "",
        prompt: options.prompt,
      });
  }
};
