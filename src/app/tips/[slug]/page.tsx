import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE_PATH, SITE_DESCRIPTION } from "@/config/seo";
import { TipDetailPage } from "@/ui-kit/pages/Tips/TipDetailPage";
import { getAllAuthors, resolveAuthorCredit } from "@/usecases/authors";
import { getAllTips } from "@/usecases/tips";

const basePath = process.env.PAGES_BASE_PATH ?? "";

export const generateStaticParams = async () => {
  const tips = getAllTips();
  return tips.map((tip) => ({
    slug: tip.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tip = getAllTips().find((t) => t.slug === slug);
  if (!tip) return {};

  const image = {
    url: `${basePath}${DEFAULT_OG_IMAGE_PATH}`,
    width: 1200,
    height: 630,
  };

  return {
    title: tip.title,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: tip.title,
      description: SITE_DESCRIPTION,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: tip.title,
      description: SITE_DESCRIPTION,
      images: [image.url],
    },
  };
}

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
