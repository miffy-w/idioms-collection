import { IdiomItem } from '@/types';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { doubaoChat } from './autoGen/utils/doubaoChat';
import { sleep } from '@/lib/utils';

dotenv.config({
  path: "../.env.local",
});

class Examination {
    path: string;
    constructor (path: string, protected step = 2) {
        this.path = path;
    }


    async examine (startIndex = 0, endIndex?: number) {
        if (!fs.existsSync(this.path)) {
            return console.error('路径不存在');
        }

        const json: IdiomItem[] = require(this.path);
        let startIdx = startIndex;
        const step = this.step;

        while (true) {
            if (!json[startIdx]) break;

            if (endIndex && startIdx > endIndex) break;

            const slicedArr = json.slice(startIdx, Math.min(startIdx + step, endIndex ?? Infinity));
            const res = await doubaoChat(JSON.stringify(slicedArr));

            if (res) {
                const newList = this.updateJson(json, res, startIdx);
                this.writeFile(newList);
            }

            for (let i = 0; i < step; i++) {
                console.log(`已检查完：${json[startIdx + i].original}`);
            }
            startIdx += step;
            await sleep(1500);
        }

        console.log("已完成检查！")
    }

    updateJson(totalList: IdiomItem[], result: IdiomItem[], startIdx: number) {
        for (let i = 0; i < result.length; i++) {
            totalList[startIdx + i] = result[i];
        }

        return totalList;
    }

    writeFile(idiomList: IdiomItem[]) {
        fs.writeFileSync(this.path, JSON.stringify(idiomList, null, 2), 'utf-8');
    }
}

const chengyuDataPath = path.resolve(__dirname, '../src/data/en_US/chengyu/data.json');
// const xiehouyuDataPath = path.resolve(__dirname, '../src/data/en_US/xiehouyu/data.json');

const examination = new Examination(chengyuDataPath);

/** 根据参数拿到 */

examination.examine(161);
