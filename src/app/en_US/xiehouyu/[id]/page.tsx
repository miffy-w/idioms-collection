import { notFound } from 'next/navigation'
import IdiomCard from '@/components/IdiomCard';
import data from '@/data/en_US/xiehouyu/data.json';

// 生成所有静态路由：/1 /2 /3...
export async function generateStaticParams() {
  return data.map((_, idx) => ({
    id: (idx + 1).toString(),
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

// 页面组件
export default async function Page(props: Props) {
  const p = await props.params;
  const index = Number(p.id) - 1;
  const item = data[index]

  if (!item) {
    notFound();
  }

  return (
    <IdiomCard
      data={item}
    />
  )
}
