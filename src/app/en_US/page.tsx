import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

const DATA: IdiomItem = {
  id: 0,
  original: "千里送鹅毛",
  originalMeaning: '礼轻情意重',
  originalCountry: "China",
  translation: "Sending a goose feather from a thousand miles away",
  translationMeaning: "The gift is light but the sentiment is heavy",
  imageUrl: "/2026-02-12_21-37-20.webp",
  source:
    "From Chinese folklore. During the Tang Dynasty, a retainer of General Mian Bogao brought a white goose feather as a gift to the Emperor from thousands of miles away. When questioned about the meager gift, he explained that it represented the general's sincere heart despite its small value. The Emperor was moved by the sentiment. It metaphorically describes how a small gift, when sent from afar with sincere intentions, carries great emotional value.",
  meaning:
    "This idiom teaches us about the importance of sincerity and intention over material value in gift-giving and relationships. It reminds us that what matters most is the thought and effort behind a gesture, not its monetary worth. It encourages us to value emotional connections and thoughtful gestures over expensive presents.",
  usage:
    "Use this idiom when someone gives a small gift with deep sentimental value, or when acknowledging that a small gesture carries great emotional significance. For example, a handmade card from a distant friend, a small souvenir brought from a faraway trip, or a token of appreciation that may be inexpensive but heartfelt.",
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
