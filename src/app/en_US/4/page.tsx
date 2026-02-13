import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 4,
  original: "猪八戒照镜子",
  originalMeaning: "里外不是人",
  originalCountry: "China",
  translation: "Pig Bajie looks in the mirror",
  translationMeaning: "Neither inside nor outside a person",
  imageUrl: "/2026-02-12_17-13-26.webp",
  source: "From \"Journey to the West,\" one of China's Four Great Classical Novels. Zhu Bajie (Pig Bajie), one of the main characters, is a pig demon who looks in the mirror and sees his pig face. It metaphorically describes someone who ends up offending both sides and being criticized by everyone, no matter what they do.",
  meaning: "This idiom teaches us about the difficulty of trying to please everyone and the consequences of being caught between conflicting sides. It reminds us that when we try to accommodate everyone, we often end up satisfying no one. It encourages us to take a clear stance rather than trying to be all things to all people.",
  usage: "Use this idiom when someone tries to mediate between two parties but ends up being criticized by both, or when someone's efforts to please everyone backfire. For example, a manager trying to satisfy both employees and upper management but being criticized by both, or a person caught between two friends' conflicts who is blamed by both.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
