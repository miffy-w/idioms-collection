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

type IdiomData = GeneratedIdiomData | SimpleIdiomItem;

export class IdiomsManager {
  taskPath: string;
  imagePath: string;
  xiehouyuPath: string;
  chengyuPath: string;
  detailListFilename = "data.json";
  simpleListFilename = "simple.json";
  constructor(protected lang = "en_US") {
    this.taskPath = path.resolve(__dirname, `../src/data/task.txt`);
    this.imagePath = path.resolve(__dirname, "../public");
    this.xiehouyuPath = path.resolve(__dirname, `../src/data/${lang}/xiehouyu`);
    this.chengyuPath = path.resolve(__dirname, `../src/data/${lang}/chengyu`);
  }

  getDataPath(type: "xiehouyu" | "chengyu", isSimpleFile: boolean) {
    const filename = isSimpleFile
      ? this.simpleListFilename
      : this.detailListFilename;

    if (type === "chengyu") {
      return path.resolve(this.chengyuPath, filename);
    } else {
      return path.resolve(this.xiehouyuPath, filename);
    }
  }

  async run(originalIdioms?: string[] | string) {
    let idioms: IdiomInput[] = [];

    if (originalIdioms) {
      idioms = this.getIdiomInput(
        Array.isArray(originalIdioms) ? originalIdioms : originalIdioms.split("\n"),
      );
    } else {
      // 读取任务列表
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

    // 保存数据
    this.saveData(updatedData);
  }

  saveData(data: GeneratedIdiomData[]) {
    const chengyuData = data.filter((item) => !item.originalMeaning);
    const xiehouyuData = data.filter((item) => !!item.originalMeaning);

    const chengyuDetailPath = this.getDataPath("chengyu", false);
    const chengyuSimplePath = this.getDataPath("chengyu", true);
    const xiehouyuDetailPath = this.getDataPath("xiehouyu", false);
    const xiehouyuSimplePath = this.getDataPath("xiehouyu", true);

    const chengyuSimpleList = this.createSimpleIdiomList(chengyuData);
    const xiehouyuSimpleList = this.createSimpleIdiomList(xiehouyuData);

    this.saveDataFile(chengyuData, chengyuDetailPath);
    this.saveDataFile(chengyuSimpleList, chengyuSimplePath);
    this.saveDataFile(xiehouyuData, xiehouyuDetailPath);
    this.saveDataFile(xiehouyuSimpleList, xiehouyuSimplePath);
  }

  saveDataFile(data: IdiomData[], filePath: string, replace = false) {
    if (!data.length) return;

    let json = data;

    if (!replace && fs.existsSync(filePath)) {
      json = require(filePath) as IdiomData[];
      json.push(...data);
    }

    const finalData = this.updateDataId(json);
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));
  }

  updateDataId(data: IdiomData[]) {
    return data.map((item, idx) => {
      return {
        ...item,
        id: idx + 1,
      };
    });
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
    const result: IdiomInput[] = [];
    idioms.forEach((line) => {
      const [firstPart, secondPart] = line.split("——");

      const firstPartTrimed = firstPart.trim();
      const secondPartTrimed = secondPart?.trim();

      if (secondPartTrimed) {
        result.push({
          original: firstPartTrimed,
          originalMeaning: secondPartTrimed,
          type: "xiehouyu" as const,
        });
      } else {
        result.push({
          original: firstPartTrimed,
          type: "chengyu" as const,
        });
      }
    });

    return result;
  }

  createSimpleIdiomList(idioms: GeneratedIdiomData[]): SimpleIdiomItem[] {
    return idioms.map(this.createSimpleIdiomItem);
  }

  createSimpleIdiomItem(idiom: GeneratedIdiomData): SimpleIdiomItem {
    let res: SimpleIdiomItem = {
      id: idiom.id,
      o: idiom.original,
      t: idiom.translation,
    };

    if (idiom.originalMeaning) {
      res.om = idiom.originalMeaning;
      res.tm = idiom.translationMeaning;
    }

    return res;
  }

  removeIdiomImage(data: GeneratedIdiomData[]) {
    data.forEach((item) => {
      const imgFilename = item.imageUrl.slice(1);
      const imagePath = path.resolve(this.imagePath, imgFilename);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    });
  }

  removeIdioms(idList: number[], type: "chengyu" | "xiehouyu") {
    const detailDataPath = this.getDataPath(type, false);
    const simpleDataPath = this.getDataPath(type, true);

    const simpleData = require(simpleDataPath) as SimpleIdiomItem[];
    const detailData = require(detailDataPath) as GeneratedIdiomData[];

    const idSet = new Set(idList);

    const deletedDetailData = detailData.filter((item) => idSet.has(item.id));
    const filteredDetailData = detailData.filter((item) => !idSet.has(item.id));
    const filteredSimpleData = simpleData.filter((item) => !idSet.has(item.id));

    this.saveDataFile(filteredDetailData, detailDataPath, true);
    this.saveDataFile(filteredSimpleData, simpleDataPath, true);

    // 删除图片
    this.removeIdiomImage(deletedDetailData);
  }

  /** 根据名称删除 */
  removeIdiomByName(name: string) {
    const { detailData, isXiehouyu, simpleDataPath, detailDataPath } =
      this.parseString(name);

    const deleteIdiomIdx = detailData.findIndex((item) => {
      if (isXiehouyu) {
        const [firstPart, secondPart] = name.split("——");
        return (
          item.original === firstPart.trim() &&
          item.originalMeaning === secondPart.trim()
        );
      } else {
        return item.original === name;
      }
    });

    if (deleteIdiomIdx > -1) {
      const deleteIdiom = detailData[deleteIdiomIdx];

      detailData.splice(deleteIdiomIdx, 1);

      this.saveDataFile(detailData, detailDataPath, true);
      this.saveDataFile(this.createSimpleIdiomList(detailData), simpleDataPath, true);

      // 删除图片
      this.removeIdiomImage([deleteIdiom]);
    } else {
      console.error("❌ 没有找到成语");
    }
  }

  /** 根据名称解析 */
  parseString(name: string) {
    const isXiehouyu = name.includes("——");
    const detailDataPath = this.getDataPath(
      isXiehouyu ? "xiehouyu" : "chengyu",
      false,
    );
    const simpleDataPath = this.getDataPath(
      isXiehouyu ? "xiehouyu" : "chengyu",
      true,
    );
    const detailData = require(detailDataPath) as GeneratedIdiomData[];
    return {
      isXiehouyu,
      detailData,
      detailDataPath,
      simpleDataPath,
    };
  }

  queryIdiomById(id: number, type: "chengyu" | "xiehouyu") {
    const detailDataPath = this.getDataPath(type, false);
    const detailData = require(detailDataPath) as GeneratedIdiomData[];
    return detailData.find((item) => item.id === id);
  }

  queryIdiomByName(name: string) {
    const { isXiehouyu, detailData } = this.parseString(name);

    if (isXiehouyu) {
      const [firstPart, secondPart] = name.split("——");
      return detailData.find(
        (item) =>
          item.original === firstPart.trim() &&
          item.originalMeaning === secondPart.trim(),
      );
    } else {
      return detailData.find((item) => item.original === name);
    }
  }
}

const manager = new IdiomsManager();

// manager.removeIdiomByName("老鼠过街——人人喊打");
manager.run("老鼠过街——人人喊打");