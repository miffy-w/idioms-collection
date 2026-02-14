import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 18,
  original: "掩耳盗铃",
  originalMeaning: "自欺欺人",
  originalCountry: "China",
  translation: "Covering one's ears to steal a bell",
  translationMeaning: "Deceiving oneself",
  imageUrl: "/idiom-7.webp",
  source: "From \"Lüshi Chunqiu: Self-Knowledge.\" After the Fan family of Jin was destroyed, a thief wanted to steal their bell, but feared the sound would alert others. He covered his own ears to steal it, thinking that if he could not hear it, others could not either. It metaphorically describes self-deception - trying to cover up something that cannot be hidden.",
  meaning: "This idiom exposes the absurdity of self-deception. It reminds us that we cannot hide the truth from others by hiding it from ourselves. It teaches us to face reality honestly rather than pretending problems do not exist. Self-deception only delays necessary action and compounds our difficulties.",
  usage: "Use this idiom when someone tries to hide obvious problems or mistakes by pretending they do not exist. For example, a student who cheats on an exam and thinks no one will notice, or someone who ignores financial problems hoping they will disappear on their own.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
