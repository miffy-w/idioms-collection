import HomeLayout from "@/components/Home";
import idiomList from "./en_US/xiehouyu/idiomList.json";
import { BaseUrl } from "./layout";

export default function Home() {
  return (
    <HomeLayout
      baseUrl={BaseUrl}
      idiomList={idiomList}
      viewAllBtnText="Explore All Idioms"
    >
      Xiehouyu (歇后语) is a unique form of Chinese linguistic art, consisting
      of two parts: the first part is a vivid metaphor, and the second part is
      the explanation, clarification, or complement to the first. These
      statements, imbued with traditional Chinese culture and wisdom, are paired
      with exquisite illustrations and English translations to help you better
      understand their deeper meanings.
    </HomeLayout>
  );
}
