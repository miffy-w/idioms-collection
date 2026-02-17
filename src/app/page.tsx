import HomeLayout from "@/components/Home";
import idiomList from "@/data/en_US/xiehouyu/simple.json";
import { BaseUrl } from "./layout";

export const XiehouyuDescription = `
  Xiehouyu (歇后语) is a unique form of Chinese linguistic art, consisting
  of two parts: the first part is a vivid metaphor, and the second part is
  the explanation, clarification, or complement to the first. These
  statements, imbued with traditional Chinese culture and wisdom, are paired
  with exquisite illustrations and English translations to help you better
  understand their deeper meanings.
`;

export const ChengyuDescription = `
  Chengyu (成语) are a unique form of Chinese linguistic art, typically consisting of four characters that encapsulate profound meanings derived from historical events, ancient literature, or folklore. These idioms, imbued with traditional Chinese culture and wisdom, are paired with exquisite illustrations and English translations to help you better understand their deeper meanings and cultural context.
`;

export default function Home() {
  return (
    <>
      <HomeLayout
        baseUrl={BaseUrl}
        idiomList={idiomList}
        viewAllBtnText="Explore"
      >
        {XiehouyuDescription}
      </HomeLayout>
    </>
  );
}
