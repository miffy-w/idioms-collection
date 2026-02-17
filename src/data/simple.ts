import enUSXiehouyuSimple from './en_US/xiehouyu/simple.json';
import enUSChengyuSimple from './en_US/chengyu/simple.json';

export interface SimpleDataItem {
    id: number;
    o: string;
    t: string;
    om?: string;
    tm?: string;
}

export default [
    {
        l: 'en_US',
        d: [...enUSXiehouyuSimple, ...enUSChengyuSimple] as SimpleDataItem[]
    }
];
