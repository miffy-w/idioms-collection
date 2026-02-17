import { LANGUAGE_DATA } from "@/data/language";
import { IdiomList } from "@/components/IdiomsDrawer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

const langs = Object.keys(LANGUAGE_DATA);

type Params = { type: string; lang: string };

export async function generateStaticParams() {
  const res: Params[] = [];
  for (const lang of langs) {
    const langData = LANGUAGE_DATA[lang as keyof typeof LANGUAGE_DATA];

    for (const it of langData.idiomTypes) {
      res.push({
        lang: lang,
        type: it.name,
      });
    }
  }
  return res;
}

interface Props {
  params: Promise<Params>;
}

// 页面组件
export default async function Page(props: Props) {
  const p = await props.params;
  const language = LANGUAGE_DATA[p.lang as keyof typeof LANGUAGE_DATA];
  const tp = language?.idiomTypes.find((t) => t.name === p.type);

  if (!tp) {
    notFound();
  }

  return (
    <div className="max-w-160 mx-auto px-1">
      <p className="mb-8 font-sans text-fuchsia-900 dark:text-fuchsia-300 text-[18px]">
        {tp.description}
      </p>

      <IdiomList
        virtual={false}
        items={tp.simpleData}
        baseUrl={`/${p.lang}/${p.type}`}
        className="hidden-scroll-bar max-h-100 overflow-auto"
      />

      {/* 渐变按钮 */}
      <div className="flex justify-center mt-8">
        <Link replace href={`/${p.lang}/${p.type}/1`}>
          <button className="flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-rose-500 to-purple-500 text-white font-medium hover:from-rose-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
            {language.locale.view} <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
