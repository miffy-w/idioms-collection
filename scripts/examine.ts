import { IdiomItem } from '@/types';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { doubaoChat } from './autoGen/utils/doubaoChat';

dotenv.config({
  path: "../.env.local",
});

class Examination {
    path: string;
    constructor (path: string) {
        this.path = path;
    }


    async examine () {
        if (!fs.existsSync(this.path)) {
            return console.error('路径不存在');
        }

        const json: IdiomItem[] = require(this.path);
        let startIdx = 0;
        let step = 4;

        const result: IdiomItem[] = [];

        while (true) {
            if (!json[startIdx]) break;

            const slicedArr = json.slice(startIdx, startIdx + step);
            const res = await doubaoChat(JSON.stringify(slicedArr));

            if (res) {
                result.push(...res);
            }

            startIdx += step;
        }

        this.writeFile(result);
    }

    writeFile(idiomList: IdiomItem[]) {
        fs.writeFileSync(this.path, JSON.stringify(idiomList, null, 2), 'utf-8');
    }
}

const chengyuDataPath = path.resolve(__dirname, '../src/data/en_US/chengyu/data.json');
// const xiehouyuDataPath = path.resolve(__dirname, '../src/data/en_US/xiehouyu/data.json');

const examination = new Examination(chengyuDataPath);

examination.examine();  
