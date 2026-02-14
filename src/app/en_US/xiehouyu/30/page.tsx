import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 30,
  original: "滥竽充数",
  originalMeaning: "冒充内行",
  originalCountry: "China",
  translation: "Passing off as a yu player",
  translationMeaning: "Pretending to be competent when one is not",
  imageUrl: "/idiom-19.webp",
  source: "From \"Han Feizi: Internal Deposition.\" King Xuan of Qi loved yu (ancient wind instrument) music and employed 300 players to perform together. A man named Nanguo who could not play joined the group and faked playing. When the next king required solo performances, Nanguo fled. It metaphorically describes someone pretending to have skills they lack.",
  meaning: "This idion warns against deception and the lack of genuine skill. It teaches us that pretending to be competent will eventually be exposed, especially when individual performance is required. It reminds us of the importance of developing real skills rather than relying on superficial appearances or the ability to blend into a crowd.",
  usage: "Use this idiom when someone pretends to have knowledge or skills they do not possess, or when incompetent people are hidden among capable groups. For example, an employee who cannot do their job but survives by looking busy, or a student who cheats on assignments instead of learning.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
