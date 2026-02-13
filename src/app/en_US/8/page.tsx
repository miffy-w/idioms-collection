import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 8,
  original: "八仙过海",
  originalMeaning: "各显神通",
  originalCountry: "China",
  translation: "Eight Immortals cross the sea",
  translationMeaning: "Each showing their special abilities",
  imageUrl: "/2026-02-12_17-13-27.jpg",
  source: "From Chinese mythology and folklore. The Eight Immortals (八仙) - eight legendary figures in Chinese Taoism - needed to cross the sea to attend a conference. Instead of taking a boat, each immortal used their unique magical powers and tools to cross the ocean. Some rode on lotus flowers, others used bamboo tubes, swords, or their own abilities. It metaphorically describes people using their unique skills and methods to achieve the same goal.",
  meaning: "This idiom celebrates diversity of skills and encourages creative problem-solving. It teaches us that there are many paths to the same destination and that everyone has unique strengths they can contribute. It encourages us to value different approaches and recognize that success can be achieved through various methods.",
  usage: "Use this idiom when a group of people all achieve the same goal but through different methods, or when encouraging people to use their unique talents. For example, team members each using their different skills to solve a problem, or different countries taking different approaches to tackle climate change.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
