import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 6,
  original: "铁杵磨成针",
  originalMeaning: "功到自然成",
  originalCountry: "China",
  translation: "Grinding an iron pestle into a needle",
  translationMeaning: "Perseverance leads to success",
  imageUrl: "/2026-02-12_14-12-20.jpg",
  source: "The story of Li Bai, one of China's greatest poets, meeting an old woman grinding a large iron pestle into a needle by a river. When asked why she was doing something so difficult, she replied that with enough time and patience, anything can be accomplished. This inspired Li Bai to study harder.",
  meaning: "This idiom teaches the power of persistence and dedication. It reminds us that with enough time, patience, and consistent effort, even the most difficult goals can be achieved. It encourages us to stay committed to our goals despite obstacles and setbacks.",
  usage: "Use this idiom when someone needs encouragement to keep working on a long-term goal, or when celebrating someone who has achieved success through persistent effort. For example, a student preparing for exams over many months, or an entrepreneur building a business from scratch.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
