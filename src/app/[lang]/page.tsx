import { redirect } from "next/navigation";
import { LANGUAGE_DATA } from "@/data/language";
import HoverImageCard from "@/components/HoverImageCard";

const LANGUAGE = Object.keys(LANGUAGE_DATA);

export async function generateStaticParams() {
  return LANGUAGE.map((lang) => ({ lang }));
}

interface Props {
  params: Promise<{ lang: string }>;
}

// 页面组件
export default async function Page(props: Props) {
  const p = await props.params;
  const language = LANGUAGE_DATA[p.lang as keyof typeof LANGUAGE_DATA];

  if (!language) {
    redirect(`/${LANGUAGE[0]}`);
  }

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {language.idiomTypes.map((type) => (
        <div key={type.name} className="grow shrink-0 md:max-w-100 max-w-full">
          <HoverImageCard
            key={type.name}
            title={type.title}
            image={type.cover}
            description={type.description}
            href={`/${p.lang}/${type.name}`}
            actionButtonText={language.locale.learnMore}
          />
          </div>
      ))}
    </div>
  );
}
