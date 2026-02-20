import { notFound } from "next/navigation";
import IdiomCard from "@/components/IdiomCard";
import { LANGUAGE_DATA } from "@/data/language";
import ScrollProgressBar from "@/components/ScrollProgressBar";

type Params = {
  lang: string;
  type: string;
  id: string;
};

export async function generateStaticParams() {
  const langs = Object.keys(LANGUAGE_DATA);
  const result: Params[] = [];

  for (const lang of langs) {
    const langData = LANGUAGE_DATA[lang as keyof typeof LANGUAGE_DATA];

    langData.idiomTypes.forEach((it) => {
      it.simpleData.forEach((_, index) => {
        result.push({
          lang,
          type: it.name,
          id: (index + 1).toString(),
        });
      });
    });
  }

  return result;
}

interface Props {
  params: Promise<Params>;
}

// 页面组件
export default async function Page(props: Props) {
  const p = await props.params;
  const langData = LANGUAGE_DATA[p.lang as keyof typeof LANGUAGE_DATA];
  const idiomInfo = langData.idiomTypes.find((it) => it.name === p.type);
  const item = idiomInfo?.data.find((_, index) => index + 1 === parseInt(p.id));

  if (!item || !idiomInfo) {
    notFound();
  }

  return (
    <IdiomCard
      data={item}
      baseUrl={`/${p.lang}/${p.type}`}
      simpleList={idiomInfo.simpleData}
      meaningTitle={langData.locale.meaningTitle}
      imageErrorText={langData.locale.imageErrorText}
      culturalBackground={langData.locale.culturalBackground}
    />
  );
}
