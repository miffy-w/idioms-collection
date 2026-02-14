import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 17,
  original: "杞人忧天",
  originalMeaning: "庸人自扰",
  originalCountry: "China",
  translation: "A person from Qi worrying about the sky",
  translationMeaning: "Unnecessary anxiety",
  imageUrl: "/idiom-6.webp",
  source: "From \"Liezi: Tianrui.\" A person from Qi worried all day that the sky would collapse and the earth would sink, leaving him with no place to stay, so he could neither eat nor sleep. It metaphorically describes unnecessary or groundless anxiety.",
  meaning: "This idiom satirizes irrational fears and anxiety over imagined disasters. It teaches us to distinguish between legitimate concerns and groundless worries. It reminds us that excessive worry over uncontrollable events only wastes our energy and deprives us of peace of mind.",
  usage: "Use this idiom when someone worries excessively about extremely unlikely events or disasters. For example, someone who refuses to travel because they are convinced the plane will crash, or someone who is constantly anxious about fictional scenarios like meteor strikes or zombie outbreaks.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
