const fs = require("fs");
const path = require("path");
const { CozeAPI, COZE_CN_BASE_URL } = require("@coze/api");

// 配置
const TASK_FILE = path.join(__dirname, "../data/task.txt");
const OUTPUT_DIR = path.join(__dirname, "../src/app/en_US/xiehouyu");
const PUBLIC_DIR = path.join(__dirname, "../public");
const IDIOM_LIST_FILE = path.join(OUTPUT_DIR, "idiomList.json");

// 初始化 Coze API 客户端
const client = new CozeAPI({
  token: "pat_eEOXxCvuBRUYbutNBYUE4EziCkVJEynXQSVgh6Elozc2GgX5V9yEX7BXhOgJdW4m", // 替换为你的 PAT
  baseURL: COZE_CN_BASE_URL,
});

// 确保目录存在
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 获取下一个可用的 ID
async function getNextId() {
  try {
    const files = await fs.promises.readdir(OUTPUT_DIR);
    const numbers = files
      .filter((file) => !isNaN(parseInt(file)))
      .map((file) => parseInt(file));
    const maxId = numbers.length > 0 ? Math.max(...numbers) : 0;
    return maxId + 1;
  } catch (error) {
    console.error("Error getting next ID:", error);
    throw error;
  }
}

// 使用 Coze API 生成翻译和描述
async function generateData(original, originalMeaning) {
  try {
    const p = `
        你是一个资深的翻译家和文化专家，精通中英文语言和文化。请为以下成语生成英文翻译、含义、出处和使用场景：
        歇后语：${original}——${originalMeaning}，
        你只需要返回 JSON 格式的结果，不要任何额外的解释或文本，JSON 结构如下：
        {
            "original": "${original}",
            "originalMeaning": "${originalMeaning}",
          "translation": "英文翻译",
          "translationMeaning": "英文含义",
          "source": "英文出处",
          "meaning": "英文解释",
          "usage": "英文使用场景"
        }
        除了original和originalMeaning字段，其他字段需要你根据成语的含义和文化背景进行创造性生成，确保内容准确且具有文化内涵。
    `;

    const response = await client.chat.createAndPoll({
      bot_id: "your_bot_id", // 替换为你的 Bot ID
      additional_messages: [
        {
          role: "user",
          content: prompt,
          content_type: "text",
        },
      ],
    });

    if (response.chat.status === "completed") {
      const reply = response.messages.find(
        (msg) => msg.role === "assistant",
      ).content;
      return JSON.parse(reply);
    } else {
      throw new Error("Failed to generate data");
    }
  } catch (error) {
    console.error("Error generating data:", error);
    throw error;
  }
}

// 使用 Coze API 生成图片
async function generateImage(original, id) {
  try {
    const prompt = `
        你是一位资深的艺术家和设计师，擅长将抽象的概念和文化元素转化为视觉艺术。请为以下内容生成一张具有象征意义的图片：${original}，
图片风格：现代简约，具有中国文化元素，大众化一些，让人容易理解，色彩鲜明但不刺眼，适合在网页上展示。
图片内容：请根据内容的含义创造性地设计图片，确保图片能够传达成语的核心意义和文化内涵。
    `;

    // 这里需要使用 Coze 的图像生成 API
    // 目前 Coze SDK 可能没有直接的图像生成接口，需要通过工作流实现
    // 假设你已经创建了一个图像生成工作流
    const workflowResponse = await client.run({
      workflow_id: "your_workflow_id", // 替换为你的工作流 ID
      parameters: {
        prompt: prompt,
      },
    });

    if (workflowResponse.status === "completed") {
      const imageUrl = workflowResponse.data.output;
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:.]/g, "_")
        .slice(0, 19);
      const imagePath = path.join(PUBLIC_DIR, `${timestamp}.webp`);

      // 下载图片到本地
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      await fs.promises.writeFile(imagePath, buffer);

      return `/${path.basename(imagePath)}`;
    } else {
      throw new Error("Failed to generate image");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

// 生成 TSX 文件
async function generateTSXFile(id, data) {
  try {
    const dirPath = path.join(OUTPUT_DIR, `${id}`);
    ensureDirExists(dirPath);

    const tsxContent = `import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: ${id},
  original: "${data.original}",
  originalMeaning: "${data.originalMeaning}",
  originalCountry: "China",
  translation: "${data.translation}",
  translationMeaning: "${data.translationMeaning}",
  imageUrl: "${data.imageUrl}",
  source: "${data.source}",
  meaning: "${data.meaning}",
  usage: "${data.usage}",
};

export default function Home() {
  return (
    <IdiomCard data={DATA} />
  );
}
`;

    const tsxPath = path.join(dirPath, "page.tsx");
    await fs.promises.writeFile(tsxPath, tsxContent);
    console.log(`Generated TSX file: ${tsxPath}`);
  } catch (error) {
    console.error("Error generating TSX file:", error);
    throw error;
  }
}

// 更新 idiomList.json
async function updateIdiomList(id, data) {
  try {
    let idiomList = [];

    if (fs.existsSync(IDIOM_LIST_FILE)) {
      const existingContent = await fs.promises.readFile(
        IDIOM_LIST_FILE,
        "utf8",
      );
      idiomList = JSON.parse(existingContent);
    }

    const newItem = {
      id: id,
      o: data.original,
      om: data.originalMeaning,
      t: data.translation,
      tm: data.translationMeaning,
    };

    idiomList.push(newItem);
    await fs.promises.writeFile(
      IDIOM_LIST_FILE,
      JSON.stringify(idiomList, null, 2),
    );
    console.log("Updated idiomList.json");
  } catch (error) {
    console.error("Error updating idiomList.json:", error);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    // 确保目录存在
    ensureDirExists(OUTPUT_DIR);
    ensureDirExists(PUBLIC_DIR);

    // 读取 task.txt 文件
    const taskContent = await fs.promises.readFile(TASK_FILE, "utf8");
    const tasks = taskContent.split("\n").filter((task) => task.trim() !== "");

    for (const task of tasks) {
      // 拆分任务
      const [original, originalMeaning] = task.split("——");

      // 生成数据
      const data = await generateData(original, originalMeaning);

      // 获取下一个 ID
      const id = await getNextId();

      // 生成图片
      const imageUrl = await generateImage(
        `${original}——${originalMeaning}`,
        id,
      );

      // 完整数据
      const fullData = {
        original,
        originalMeaning,
        imageUrl,
        translation: data.translation,
        translationMeaning: data.translationMeaning,
        source: data.source,
        meaning: data.meaning,
        usage: data.usage,
      };

      // 生成 TSX 文件
      await generateTSXFile(id, fullData);

      // 更新 idiomList.json
      await updateIdiomList(id, fullData);
    }

    console.log("Processing complete!");
  } catch (error) {
    console.error("Error processing tasks:", error);
  }
}

// 执行主函数
main();
