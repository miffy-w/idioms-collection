import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 34,
  original: "芝麻开花",
  originalMeaning: '节节高',
  originalCountry: "China",
  translation: "Sesame flowers blooming",
  translationMeaning: "Rising step by step",
  imageUrl: "/2026-02-14_12-34-55.webp",
  source:
    "This idiom originates from Chinese agriculture and folk observations. The sesame plant has a unique characteristic: as it grows, its flowers bloom from the bottom upward, with each segment producing flowers higher than the previous one. This visual metaphor describes steady progress and continuous improvement over time.",
  meaning:
    "This idiom celebrates progress, growth, and steady advancement. It teaches us that success comes from continuous effort and that each step forward builds upon the previous one. It encourages perseverance and recognizes that steady, consistent progress leads to great achievements.",
  usage:
    "Use this idiom when describing someone\'s career or life progress, or when wishing someone continued success and advancement. For example, a student getting better grades each semester, an employee receiving regular promotions, or a business steadily growing over the years.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
