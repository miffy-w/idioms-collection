# 自动生成文件内容

你是一个Nodejs脚本编写专家，请根据以下要求生成一个Nodejs脚本，该脚本需要实现以下功能：

1. 在项目根目录下有一个data页面，data中有一个task.txt文件，里面的每一行就是一个任务；
2. 读取task.txt文件的每一行，生成下面的数据格式（字段名要一致，对应的内容你需要自己重新生成）：

```tsx
export const DATA: IdiomItem = {
  id: 1,
  /** task.txt 每一行的前半句 */
  original: "千里送鹅毛",
  /** task.txt 每一行的后半句 */
  originalMeaning: '礼轻情意重',
  /** 值固定 */
  originalCountry: "China",
  /** 对应 original 的英文版本 */
  translation: "Sending a goose feather from a thousand miles away",
  /** 对应 originalMeaning 的英文版本 */
  translationMeaning: "The gift is light but the sentiment is heavy",
  /** 需要生成一张图片，要符合场景，并把图片存放到项目的 public 目录下 */
  imageUrl: "/2026-02-12_21-37-20.webp",
  /** original 对应的出处 */
  source:
    "From Chinese folklore. During the Tang Dynasty, a retainer of General Mian Bogao brought a white goose feather as a gift to the Emperor from thousands of miles away. When questioned about the meager gift, he explained that it represented the general's sincere heart despite its small value. The Emperor was moved by the sentiment. It metaphorically describes how a small gift, when sent from afar with sincere intentions, carries great emotional value.",
  /** 含义 */
  meaning:
    "This idiom teaches us about the importance of sincerity and intention over material value in gift-giving and relationships. It reminds us that what matters most is the thought and effort behind a gesture, not its monetary worth. It encourages us to value emotional connections and thoughtful gestures over expensive presents.",
  /** 使用场景 */
  usage:
    "Use this idiom when someone gives a small gift with deep sentimental value, or when acknowledging that a small gesture carries great emotional significance. For example, a handmade card from a distant friend, a small souvenir brought from a faraway trip, or a token of appreciation that may be inexpensive but heartfelt.",
}
```

注意要生成图片，图片格式以 `.webp` 结尾，并且是1:1尺寸，大小控制在500kb以下，文件命名以日期和时间命名，如果多张图片名一样，则以秒为单位增加，例如 `2026-02-12_21-37-20.webp`，`2026-02-12_21-37-21.webp`，`2026-02-12_21-37-22.webp` 等。

把生成的文件存放到当前工作区的 `src/app/en_US/xiehouyu` 目录下，你需要先读取 `src/app/en_US/xiehouyu` 目录下的所有文件名，文件名的命名是累加的，你在生成新的数据时（`DATA`），DATA的id字段要与文件名保持一致，例如，第一个文件是 `1.ts`，第二个文件是 `2.ts`，第三个文件是 `3.ts`，以此类推。你需要接着已经有的文件继续生成，不要覆盖已有的文件。

## 示例

当你读取的task.txt的一个任务是：“千里送鹅毛——礼轻情意重”后，假如`src/app/en_US/xiehouyu`中的文件件名称已经到了33，则你需要生成一个`src/app/en_US/xiehouyu/34`的目录，并在目录中创建一个`page.tsx`的文件，文件内容如下：

```tsx
import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";
// 生成的内容，注意id和文件夹名保持一致
export const DATA: IdiomItem = { ... }

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
```

处理完成后，你还需要读取`src/app/en_US/xiehouyu/idiomList.json`中的文件，把刚才生成的数据追加到这个文件的底部（是一个数组），idiomList.json文件格式如下：

```json
{
    "id": 33,
    "o": "小葱拌豆腐",
    "om": "一清二白",
    "t": "Scallion and tofu salad",
    "tm": "Perfectly clear and white"
  },
```

其中：
- id 对应 DATA.id
- o 对应 DATA.original
- om 对应 DATA.originalMeaning
- t 对应 DATA.translation
- tm 对应 DATA.translationMeaning
