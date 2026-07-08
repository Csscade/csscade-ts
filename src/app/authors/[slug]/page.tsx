import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveImageUrl } from "@/config/seo";
import { AuthorPage } from "@/ui-kit/pages/Author/AuthorPage";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

const basePath = process.env.PAGES_BASE_PATH ?? "";

export const generateStaticParams = async () => {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAllAuthors().find((a) => a.slug === slug);
  if (!author) return {};

  const de = /^[aeiouhàâéèêëîïôùû]/i.test(author.name) ? "d'" : "de ";
  const description = `Articles, tips et talks ${de}${author.name} sur Csscade.`;
  const imageUrl = resolveImageUrl(author.avatar, basePath);

  return {
    title: author.name,
    description,
    openGraph: {
      title: author.name,
      description,
      type: "profile",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: author.name,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === slug);

  if (!author) {
    return notFound();
  }

  const allArticles = getAllArticles();
  const articles = allArticles.filter((article) => article.author === slug);

  const allTips = getAllTips();
  const tips = allTips.filter((tip) => tip.author === slug);

  const allTalks = getAllTalks();
  const talks = allTalks.filter((talk) => talk.author === slug);

  return (
    <AuthorPage author={author} articles={articles} tips={tips} talks={talks} />
  );
}
