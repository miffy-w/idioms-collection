import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

const DATA: IdiomItem = {
  id: 1,
  original: "秀才遇到兵",
  originalMeaning: '有理讲不清',
  originalCountry: "China",
  translation: "Scholar meets soldier",
  translationMeaning: "Cannot reason with unreasonable people",
  imageUrl: "/2026-02-12_21-09-14.jpg",
  source:
    "This idiom originates from traditional Chinese culture. A xiucai (scholar who passed the imperial examination) represents intellect, logic, and civilized discourse, while a soldier represents brute force and authority. When a scholar tries to reason with a soldier who only responds to orders or force, his logical arguments have no effect. It metaphorically describes the frustration of trying to use reason with someone who doesn't value it or operates by different rules.",
  meaning:
    "This idiom teaches us about the futility of trying to reason with those who don't value logic or intellectual discourse. It reminds us that different people operate by different value systems, and sometimes logic simply won't work. It encourages us to recognize when communication styles are incompatible and adapt our approach accordingly, rather than wasting effort on futile reasoning.",
  usage:
    "Use this idiom when someone tries to use logic and reason with someone who responds only with force or refuses to listen, or when describing the frustration of dealing with unreasonable people. For example, trying to explain technical details to a manager who only cares about results, or trying to reason with an angry customer who refuses to listen.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
