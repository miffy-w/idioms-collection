import { IdiomItem, SimpleIdiomItem } from "@/types";
import fs from "node:fs";
import path from "node:path";

type IdiomId = string | number;

export class RemoveIdiom {
  imagePath: string;
  xiehouyuPath: string;
  chengyuPath: string;
  idiomListJsonPath = "idiomList.json";
  constructor() {
    this.imagePath = path.resolve(__dirname, "../public");
    this.xiehouyuPath = path.resolve(__dirname, "../src/app/en_US/xiehouyu");
    this.chengyuPath = path.resolve(__dirname, "../src/app/en_US/chengyu");
  }

  remove(type: "chengyu" | "xiehouyu", idList: IdiomId[]) {
    const dir = type === "chengyu" ? this.chengyuPath : this.xiehouyuPath;

    // 先找到 data.json 文件，如果找不到，则不处理
    for (const id of idList) {
      const idiomDir = path.resolve(dir, `${id}`);
      const jsonPath = path.resolve(idiomDir, "data.json");
      
      if (fs.existsSync(jsonPath)) {
        const json: IdiomItem = require(jsonPath);
        const imgPath = json.imageUrl.slice(1);

        this.delImageFile(path.resolve(this.imagePath, `./${imgPath}`));

        // 删除 idiomDir
        fs.rmdirSync(idiomDir, { recursive: true });
      } else {
        console.log("not found:", jsonPath);
      }
    }

    // 调整顺序
    this.adjustOrder(type, idList);

    this.delIdiomJsonItems(idList, dir);
  }

  delImageFile(imgPath: string) {
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    } else {
      console.log("not found:", imgPath);
    }
  }

  delIdiomJsonItems(ids: IdiomId[], dir: string) {
    const jsonPath = path.resolve(dir, this.idiomListJsonPath);
    const numberIds = ids.map((id) => Number(id));

    if (fs.existsSync(jsonPath)) {
      const json: SimpleIdiomItem[] = require(jsonPath);
      const newJson = json.filter((item: SimpleIdiomItem) => {
        return !numberIds.includes(item.id);
      }).map((item, idx) => {
        item.id = idx + 1;
        return item;
      });
      fs.writeFileSync(jsonPath, JSON.stringify(newJson, null, 2));
    } else {
      console.log("not found:", jsonPath);
    }
  }

  // 调整顺序，如果删除的是中间的文件夹，需要调整文件夹的顺序，并且更新 idiomList.json
  adjustOrder(type: "chengyu" | "xiehouyu", removedIds: IdiomId[]) {
    const dir = type === "chengyu" ? this.chengyuPath : this.xiehouyuPath;

    const directory = fs.readdirSync(dir, { withFileTypes: true }).filter(item => {
      return item.isDirectory();
    });

    const totalSize = directory.length + removedIds.length;

    /**
     * 调整文件夹顺序
     * 例如，删除了 3 和 4，那么 5 的 id 就变成了 3，6 的 id 就变成了 4
     */
    const tmpRemovedIds = removedIds.map((id) => Number(id)).sort((a, b) => a - b);
    for (const id of tmpRemovedIds) {
      const idiomDir = path.resolve(dir, `${id}`);
      
      let startId = Number(id) + 1;
      let nextIdiomDir = path.resolve(dir, `${startId}`);

      if (startId > totalSize) break; // 如果下一个 id 超过了总数，则不需要调整

      do {
        if (fs.existsSync(nextIdiomDir)) break;
        nextIdiomDir = path.resolve(dir, `${++ startId}`);
      } while (startId <= totalSize);

      fs.renameSync(nextIdiomDir, idiomDir);
      tmpRemovedIds.push(startId);
    }
  }
}

const rmIdiom = new RemoveIdiom();
rmIdiom.remove("xiehouyu", [38]);
