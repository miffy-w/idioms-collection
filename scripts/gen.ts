import fs from "node:fs";
import dotenv from "dotenv";
import path from "node:path";
import { SimpleIdiomItem } from "@/types";
import { IdiomInput, GeneratedIdiomData } from "./autoGen/config";
import { generateBatchIdiomData } from "./autoGen/generate-data";
import { generateBatchIdiomImages } from "./autoGen/generate-image";

dotenv.config({
  path: "../.env.local",
});

export class Gen {
  taskPath: string;
  imagePath: string;
  xiehouyuPath: string;
  chengyuPath: string;
  idiomList: GeneratedIdiomData[];
  idiomListJsonPath = "idiomList.json";
  constructor() {
    this.idiomList = [];
    this.taskPath = path.resolve(__dirname, "../data/task.txt");
    this.imagePath = path.resolve(__dirname, "../public");
    this.xiehouyuPath = path.resolve(__dirname, "../src/app/en_US/xiehouyu");
    this.chengyuPath = path.resolve(__dirname, "../src/app/en_US/chengyu");

    const index = this.getDirStartIdx(this.xiehouyuPath);
  }

  async run(originalIdioms?: string[]) {
    let idioms: IdiomInput[] = [];

    if (originalIdioms) {
      idioms = this.getIdiomInput(originalIdioms);
    } else {    // 读取任务列表
      idioms = await this.readTasks();
    }

    // 根据任务列表调用大模型，生成数据
    const generatedData = await generateBatchIdiomData(idioms);
    // 根据生成的数据调用大模型，生成图片
    const updatedData = await generateBatchIdiomImages(
      idioms,
      generatedData,
      this.imagePath,
    );

    console.log(`✅ 生成完成，共 ${updatedData.length} 张图片`);

    this.idiomList = updatedData;

    // 写入文件
    await this.writeData(updatedData);
  }

  async readTasks(): Promise<IdiomInput[]> {
    if (!fs.existsSync(this.taskPath)) {
      console.error(`❌ 任务文件不存在: ${this.taskPath}`);
      return [];
    }

    const data = fs.readFileSync(this.taskPath, "utf-8");

    const parsedData = data.split("\n").filter((line) => line.trim() !== "");

    return this.getIdiomInput(parsedData);
  }

  getIdiomInput(idioms: string[]) {
    return idioms.map((line) => {
      const [firstPart, secondPart] = line.split("——");

      if (secondPart) {
        return {
          original: firstPart.trim(),
          originalMeaning: secondPart.trim(),
          type: "xiehouyu" as const,
        };
      } else {
        return {
          original: firstPart.trim(),
          type: "chengyu" as const,
        };
      }
    });
  }

  getDirStartIdx(path: string) {
    const filenames = fs
      .readdirSync(path, {
        withFileTypes: true,
      })
      .filter((d) => d.isDirectory() && !isNaN(Number(d.name)));

    if (filenames.length === 0) return 1;

    const maxId = Math.max(...filenames.map((n) => Number(n.name)));
    return maxId + 1;
  }

  async writeData(data: GeneratedIdiomData[]) {
    let chengyuStartIdx = this.getDirStartIdx(this.chengyuPath);
    let xiehouyuStartIdx = this.getDirStartIdx(this.xiehouyuPath);
    const successData = {
      chengyu: [] as GeneratedIdiomData[],
      xiehouyu: [] as GeneratedIdiomData[],
    };

    for (const item of data) {
      console.log(`📁 正在写入: ${item.original} (ID: ${item.id})`);

      const isChengyu = !item.originalMeaning;
      const dirPath = isChengyu ? this.chengyuPath : this.xiehouyuPath;
      const dirname = isChengyu ? chengyuStartIdx : xiehouyuStartIdx;

      item.id = dirname; // 更新 ID 为目录名，保持一致

      const dir = path.join(dirPath, dirname.toString());
      fs.mkdirSync(dir, { recursive: true });

      // 写入数据文件
      const dataFile = path.join(dir, "data.json");
      fs.writeFileSync(dataFile, JSON.stringify(item, null, 2));

      const componentFile = path.join(dir, "page.tsx");
      fs.writeFileSync(componentFile, this.generateComponentContent());

      chengyuStartIdx += isChengyu ? 1 : 0;
      xiehouyuStartIdx += !isChengyu ? 1 : 0;

      successData[isChengyu ? "chengyu" : "xiehouyu"].push(item);
    }

    console.log(`✅ 写入完成，共 ${data.length} 条数据`);

    /** 更新 idiomList.json */
    this.updateIdiomListJson(successData.chengyu, this.chengyuPath);
    this.updateIdiomListJson(successData.xiehouyu, this.xiehouyuPath);
  }

  updateIdiomListJson(data: GeneratedIdiomData[], dirname: string) {
    if (!data.length) return;

    const simpleData = data.map<SimpleIdiomItem>((item) => ({
      id: item.id,
      o: item.original,
      om: item.originalMeaning,
      t: item.translation,
      tm: item.translationMeaning,
    }));

    /** 更新 idiomList.json */
    const idiomListPath = path.resolve(dirname, this.idiomListJsonPath);

    if (fs.existsSync(idiomListPath)) {
      const json: SimpleIdiomItem[] = require(idiomListPath);
      json.push(...simpleData);
      fs.writeFileSync(idiomListPath, JSON.stringify(json, null, 2));
    } else {
      fs.writeFileSync(idiomListPath, JSON.stringify(simpleData, null, 2));
    }
  }

  generateComponentContent() {
    return `
        import IdiomCard from "@/components/IdiomCard";
        import DATA from './data.json';

        export default function Home() {
            return (
                <IdiomCard
                    data={DATA}
                />
            );
        }
        `;
  }
}

new Gen().run([
    '癞蛤蟆想吃天鹅肉——痴心妄想'
]);
