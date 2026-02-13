import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 31,
  original: "拔苗助长",
  originalMeaning: "欲速则不达",
  originalCountry: "China",
  translation: "Pulling up seedlings to help them grow",
  translationMeaning: "Haste makes waste",
  imageUrl: "/idiom-20.webp",
  source: "From \"Mengzi: Gongsun Chou I.\" A farmer in Song was impatient for his rice seedlings to grow taller, so he pulled them up one by one. The seedlings withered and died. It metaphorically describes forcing development or progress, which results in damage or failure.",
  meaning: "This idiom teaches the wisdom of patience and respecting natural processes. It reminds us that growth and development cannot be rushed without causing harm. It cautions against impatience and the desire for immediate results at the expense of long-term success. It encourages us to trust in natural timing and sustainable development.",
  usage: "Use this idiom when someone tries to rush development or growth, resulting in damage. For example, parents forcing children into advanced education before they are ready, or a business expanding too quickly without building a solid foundation, leading to collapse.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
