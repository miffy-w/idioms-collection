import fs from "node:fs";
import dotenv from "dotenv";
import path from "node:path";
import { IdiomType, IDIOM_TYPE, SimpleIdiomItem } from "@/types";
import { IdiomInput, GeneratedIdiomData } from "./autoGen/config";
import { generateBatchIdiomData } from "./autoGen/generate-data";
import { generateBatchIdiomImages } from "./autoGen/generate-image";

dotenv.config({
  path: "../.env.local",
});

type IdiomData = GeneratedIdiomData | SimpleIdiomItem;

export class IdiomsManager {
  imagePath: string;
  idiomPath: string;
  detailListFilename = "data.json";
  simpleListFilename = "simple.json";
  constructor(protected idiomType: IdiomType, protected lang = "en_US") {
    this.imagePath = path.resolve(__dirname, "../public");
    this.idiomPath = path.resolve(__dirname, `../src/data/${lang}/${idiomType}`);
  }

  getDataPath(isSimpleFile: boolean) {
    const filename = isSimpleFile
      ? this.simpleListFilename
      : this.detailListFilename;

    return path.resolve(this.idiomPath, filename);
  }

  async run(originalIdioms: string[] | string, removeFormer = false) {
    const idioms = this.getIdiomInput(originalIdioms);

    // 删除之前的
    if (removeFormer) {
      idioms.forEach(i => {
        if (i.type === IDIOM_TYPE.xiehouyu) {
          this.removeIdiomByName(`${i.original}——${i.originalMeaning}`);
        } else {
          this.removeIdiomByName(i.original);
        }
      });
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
    const idiomDetailPath = this.getDataPath(false);
    const idiomSimplePath = this.getDataPath(true);
    const idiomSimpleList = this.createSimpleIdiomList(data);

    this.saveDataFile(data, idiomDetailPath);
    this.saveDataFile(idiomSimpleList, idiomSimplePath);
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

  getIdiomInput(idiom: string[] | string) {
    const result: IdiomInput[] = [];

    const idiomList = Array.isArray(idiom) ? idiom : [idiom];

    if (this.idiomType === IDIOM_TYPE.xiehouyu) {
      for (const line of idiomList) {
        const item = line.trim();
        if (!item) continue;

        const [firstPart, secondPart] = item.split("——");
        const firstPartTrimed = firstPart.trim();
        const secondPartTrimed = secondPart?.trim();

        if (secondPartTrimed) {
          result.push({
            type: this.idiomType,
            original: firstPartTrimed,
            originalMeaning: secondPartTrimed,
          });
        }
      }
    } else {
      for (const line of idiomList) {
        const item = line.trim();
        if (!item) continue;

        result.push({
          original: item,
          type: this.idiomType,
        });
      }
    }

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

  removeIdioms(idList: number[]) {
    const detailDataPath = this.getDataPath(false);
    const simpleDataPath = this.getDataPath(true);

    const simpleData = require(simpleDataPath) as SimpleIdiomItem[];
    const detailData = require(detailDataPath) as GeneratedIdiomData[];

    const idSet = new Set(idList);

    const deletedDetailData = detailData.filter((item) => idSet.has(item.id));

    if (!deletedDetailData.length) return;
    // 删除数据
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
      this.parse();

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
      console.error("❌ 没有找到成语", name);
    }
  }

  /** 根据名称解析 */
  parse() {
    const isXiehouyu = this.idiomType === IDIOM_TYPE.xiehouyu;
    const detailDataPath = this.getDataPath(false);
    const simpleDataPath = this.getDataPath(true);
    const detailData = require(detailDataPath) as GeneratedIdiomData[];
    return {
      isXiehouyu,
      detailData,
      detailDataPath,
      simpleDataPath,
    };
  }

  queryIdiomById(id: number) {
    const detailDataPath = this.getDataPath(false);
    const detailData = require(detailDataPath) as GeneratedIdiomData[];
    return detailData.find((item) => item.id === id);
  }

  queryIdiomByName(name: string) {
    const { isXiehouyu, detailData } = this.parse();

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

const xiehouyuManager = new IdiomsManager(IDIOM_TYPE.xiehouyu);
// xiehouyuManager.removeIdioms([52]);
// xiehouyuManager.run("大海捞针——没处寻");

const chengyuManager = new IdiomsManager(IDIOM_TYPE.chengyu);
// chengyuManager.removeIdioms([120]);
chengyuManager.run(["一丘之貉"], true);

const proverbManager = new IdiomsManager(IDIOM_TYPE.proverb);
