import axios from "axios";

export type Modal =
  | "doubao-seedream-5-0-260128"
  | "doubao-seedream-4-5-251128"
  | "doubao-seedream-4-0-250828"
  | "doubao-seedream-3-0-t2i-250415";

export interface Options {
  model?: Modal;
  prompt: string;
  apiKey: string;
}

interface OriginalResponseData {
  model: string;
  created: string;
  data: [
    {
      url: string;
      size: `${number}x${number}`;
    },
  ];
  usage: {
    generated_images: number;
    output_tokens: number;
    total_tokens: number;
  };
}

export interface ResponseData {
  url: string;
  height: number;
  width: number;
}

export function doubaoGenImg({
  prompt,
  apiKey,
  model = "doubao-seedream-3-0-t2i-250415",
}: Options): Promise<ResponseData> {
  const payload: Record<string, string | number | boolean> = {
    model,
    prompt,
    size: "2K",
    watermark: false,
    response_format: "url",
  };

  if (model === 'doubao-seedream-3-0-t2i-250415') {
    payload.size = '1024x1024';
    payload.guidance_scale = 2.5;
    payload.seed = Math.floor(Math.random() * 100000);
  }

  return axios
    .post<OriginalResponseData>(
      "https://ark.cn-beijing.volces.com/api/v3/images/generations",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
    .then((res) => {
      const imageData = res.data.data.find((i) => i.url);
      console.log("🚀 ~ doubaoGenImg ~ imageData:", imageData);

      if (imageData) {
        const [width, height] = imageData.size.split("x").map(Number);
        return {
          url: imageData.url,
          width,
          height,
        };
      } else {
        throw new Error("imageData is null");
      }
    });
}
