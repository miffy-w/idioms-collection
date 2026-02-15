import axios from "axios";

export type ImageModel =
  | "wan2.6-i2v"
  | "qwen-image-max"
  | "qwen-image-plus-2026-01-09"
  | "z-image-turbo";

interface GenerateImageOptions {
  apiKey: string;
  model?: ImageModel;
  prompt: string;
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

export function generateImage({
  apiKey,
  model = "qwen-image-plus-2026-01-09",
  prompt,
}: GenerateImageOptions) {
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
          negative_prompt:
            "低分辨率，低画质，肢体畸形，手指畸形，画面过饱和，蜡像感，人脸无细节，过度光滑，画面具有AI感。构图混乱。文字模糊，扭曲。",
          prompt_extend: true,
          watermark: false,
          size: "1328*1328",
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
      return res.data as ResponseData;
    });
}

export const getImageUrl = (response: ResponseData) => {
  return {
    url: response.output.choices[0].message.content[0].image,
    width: response.usage.width,
    height: response.usage.height,
  };
};
