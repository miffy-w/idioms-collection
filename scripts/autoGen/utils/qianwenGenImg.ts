import axios from "axios";

export type ImageModel =
  | "qwen-image-max"
  | "qwen-image-plus-2026-01-09"
  | "z-image-turbo";

interface GenerateImageOptions {
  apiKey: string;
  model?: ImageModel;
  prompt: string;
  negative_prompt?: string;
}

export interface ResponseData {
  output: {
    choices: [
      {
        finish_reason: "stop";
        message: {
          content: [
            {
              image: string;
            },
          ];
          role: "assistant";
        };
      },
    ];
    task_metric: {
      FAILED: 0;
      SUCCEEDED: 1;
      TOTAL: 1;
    };
  };
  usage: {
    height: number;
    image_count: number;
    width: number;
  };
  request_id: string;
}

export const getImageUrl = (response: ResponseData) => {
  return {
    url: response.output.choices[0].message.content[0].image,
    width: response.usage.width,
    height: response.usage.height,
  };
};

/**
 * 千恩AI图像生成函数
 * @param {GenerateImageOptions} options - 生成图像的配置选项
 * @returns {Promise<ResponseData>} 返回生成的图像数据
 */
export function qianenGenImg({
  apiKey,
  model = "z-image-turbo",
  prompt,
  negative_prompt,
}: GenerateImageOptions) {
  const isZImg = model === "z-image-turbo";

  return axios
    .post(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      {
        model,
        input: {
          messages: [
            {
              role: "user",
              content: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        parameters: {
          negative_prompt: negative_prompt ||
            "低分辨率，低画质，肢体畸形，手指畸形，画面过饱和，蜡像感，人脸无细节，过度光滑，画面具有AI感。构图混乱。文字模糊，扭曲。",
          prompt_extend: true,
          watermark: false,
          size: isZImg ? "1536*1536" : "1328*1328",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
    .then((res) => {
      return getImageUrl(res.data as ResponseData);
    });
}
