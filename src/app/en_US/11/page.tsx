import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 11,
  original: "狗拿耗子",
  originalMeaning: "多管闲事",
  originalCountry: "China",
  translation: "A dog trying to catch mice",
  translationMeaning: "Too meddlesome",
  imageUrl: "/dog.webp",
  source: "This idiom originates from the Qing Dynasty novel \"The Story of Heroic Sons and Daughters\" (儿女英雄传) by Wen Kang, specifically chapter 34. It metaphorically describes meddling in affairs that are outside one's responsibility or expertise. Traditionally, a dog's duty is to guard the house, while catching mice is the cat's job; thus, a dog attempting to catch mice is seen as overstepping its bounds.",
  meaning: "This idiom cautions against interfering in matters that do not concern you or are beyond your role. It highlights the importance of respecting boundaries and focusing on one's own responsibilities rather than unnecessarily involving oneself in others' affairs. It serves as a reminder that even with good intentions, meddling can be unwelcome and counterproductive.",
  usage: "Use this idiom when someone interferes in a situation that is none of their business, or when they try to take on a task that is clearly someone else's responsibility. For example, giving unsolicited advice on a colleague's project, or getting involved in a family dispute that doesn't involve you.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
