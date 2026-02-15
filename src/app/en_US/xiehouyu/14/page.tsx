import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";
import DATA from './data.json';


export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
