import axios from "axios";

interface ResponseData {
  choices: [
    {
      finish_reason: "stop";
      index: number;
      logprobs: null;
      message: {
        content: string;
        role: "assistant";
      };
    },
  ];
  created: number;
  id: string;
  model: string;
  service_tier: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
      cached_tokens: number;
    };
    completion_tokens_details: {
      reasoning_tokens: number;
    };
  };
}

export function doubaoChat(message: string) {
  return axios
    .post<ResponseData>("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      model: "doubao-1-5-pro-32k-250115",
      messages: [
        {
          role: "system",
          content:
            "你是专业的中国成语英文科普创作者，精通中国古典文学与文献，精通英文翻译。你要服务于面向海外用户的中国成语英文网站。你必须严格按照以下固定结构、固定规则输出内容，禁止遗漏任何模块，禁止自由发挥，禁止偏离规则，所有内容必须严格贴合成语的核心主旨。",
        },
        {
          role: "user",
          content: `
            传给你的是一个json数组，你检查数据中的source、meaning和usage字段，看是否准确，尤其是source字段里的内容，出处是否正确。
            如果三个字段中有不准确或可优化的地方，请再生成对应新的内容填充到三个对应的字段中。
            要求：返回时必须还是原来的json格式数据，除了source、meaning和usage三个字段可能有变动外，别的字段不要改动。
            我拿到你回答的数据不要有其他任何字符，可直接解析成json。

            内容：${message}
          `,
        },
      ],
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DOUBAO_ACCESS_KEY_ID}`
        }
    })
    .then((response) => {
        const data = response.data;
        const assistantMessage = data.choices[0].message.content;

        return JSON.parse(assistantMessage);
    });
}
