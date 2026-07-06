import { notFound } from "next/navigation";
import { TipDetailPage } from "@/ui-kit/pages/Tips/TipDetailPage";
import { getAllAuthors, resolveAuthorCredit } from "@/usecases/authors";
import { getAllTips } from "@/usecases/tips";

export const generateStaticParams = async () => {
  const tips = getAllTips();
  return tips.map((tip) => ({
    slug: tip.slug,
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tips = getAllTips();
  const tip = tips.find((t) => t.slug === slug);
  if (!tip) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === tip.author);
  const coAuthor = tip.coAuthor
    ? resolveAuthorCredit(tip.coAuthor, authors)
    : undefined;

  return <TipDetailPage tip={tip} author={author} coAuthor={coAuthor} />;
}
