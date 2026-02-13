import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 13,
  original: "肉包子打狗",
  originalMeaning: "有去无回",
  originalCountry: "China",
  translation: "Hitting a dog with a meat bun",
  translationMeaning: "Gone forever",
  imageUrl: "/idiom-2.webp",
  source: "This idiom comes from \"Journey to the West.\" Sun Wukong used meat buns to lure dogs while fighting demons, but the buns were eaten and never returned. It metaphorically describes something or someone given away that cannot be recovered.",
  meaning: "This idiom warns us about irreversible decisions and actions. It highlights the importance of considering consequences before giving something away or committing to a course of action. Once something is lost or given without proper consideration, it may be impossible to retrieve.",
  usage: "Use this idiom when describing situations where money, resources, or people are given away with no hope of return. For example, lending money to someone who has no intention or ability to repay, or investing in a venture without proper research that later turns out to be a scam.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
