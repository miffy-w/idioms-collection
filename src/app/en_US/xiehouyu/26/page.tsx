import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 26,
  original: "狗咬吕洞宾",
  originalMeaning: "不识好人心",
  originalCountry: "China",
  translation: "A dog bites Lu Dongbin",
  translationMeaning: "Biting the hand that feeds you",
  imageUrl: "/idiom-15.webp",
  source: "Based on the legend of Lu Dongbin, one of the Eight Immortals in Taoism. Known for his kindness and desire to help people become immortals, he was once bitten by a dog he was trying to save. It metaphorically describes someone who repays kindness with hostility or misinterprets good intentions.",
  meaning: "This idiom warns against the ingratitude and misunderstanding of kindness. It teaches us that not everyone will appreciate or understand our good intentions. It reminds us that despite our best efforts to help, some people may respond negatively. It encourages patience and wisdom in choosing whom to help and how to help them.",
  usage: "Use this idiom when someone responds with hostility to kindness, or when good intentions are misunderstood and rejected. For example, a parent trying to protect their child from harm but being yelled at, or a colleague offering helpful advice that is angrily rejected.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
