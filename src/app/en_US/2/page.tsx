import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

export const DATA: IdiomItem = {
  id: 2,
  original: "泼出去的水",
  originalMeaning: '收不回',
  originalCountry: "China",
  translation: "Spilled water",
  translationMeaning: "Irreversible, cannot be taken back",
  imageUrl: "/2026-02-12_21-09-11.webp",
  source:
    "This idiom originates from Chinese proverbs. Once water is splashed onto the ground, it spreads and is absorbed by the earth, making it impossible to collect back. It metaphorically describes actions, decisions, or words that, once done or said, cannot be reversed or taken back.",
  meaning:
    "This idiom teaches us about the permanence of our actions and the importance of thinking before acting or speaking. It reminds us that some decisions are irreversible and that we must accept the consequences of our choices. It encourages us to be thoughtful and deliberate in our words and actions, recognizing that we cannot undo the past.",
  usage:
    "Use this idiom when describing something that cannot be reversed or taken back, or when warning about the irreversibility of certain actions. For example, harsh words spoken in anger that cannot be unsaid, a resignation letter submitted that cannot be withdrawn, or a decision made that has lasting consequences.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
