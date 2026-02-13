import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 29,
  original: "隔岸观火",
  originalMeaning: "袖手旁观",
  originalCountry: "China",
  translation: "Watching fire from opposite bank",
  translationMeaning: "Detached observation without getting involved",
  imageUrl: "/idiom-18.webp",
  source: "From \"Feng Menglong Stories.\" A man stood across the river watching a fire, making comments about how people should extinguish it without taking any action himself. It metaphorically describes someone who remains aloof from troubles or conflicts, watching without getting involved.",
  meaning: "This idiom cautions against the indifference of detached observation. It teaches us that standing aside and watching without helping is a form of moral failure. It reminds us that we have a responsibility to help when we can, rather than being passive spectators of others' misfortunes. It encourages courage and compassion in taking action.",
  usage: "Use this idiom when someone watches others in trouble without offering help, or when someone remains detached from problems that require involvement. For example, bystanders watching a crime without calling for help, or colleagues ignoring workplace bullying without intervening.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
