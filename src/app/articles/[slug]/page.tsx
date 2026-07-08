import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE_PATH, resolveImageUrl } from "@/config/seo";
import { ArticleDetailPage } from "@/ui-kit/pages/Articles/ArticleDetailPage";
import { getAllArticles, getReadingTime } from "@/usecases/articles";
import { getAllAuthors, resolveAuthorCredit } from "@/usecases/authors";

const basePath = process.env.PAGES_BASE_PATH ?? "";

export const generateStaticParams = async () => {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) return {};

  const image = article.coverImage
    ? {
        url: resolveImageUrl(article.coverImage.src, basePath),
        alt: article.coverImage.alt,
      }
    : {
        url: `${basePath}${DEFAULT_OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
      };

  return {
    title: article.title,
    openGraph: {
      title: article.title,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
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

  const articles = getAllArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === article.author);
  const coAuthor = article.coAuthor
    ? resolveAuthorCredit(article.coAuthor, authors)
    : undefined;

  const readingTime = getReadingTime(article.content);

  return (
    <ArticleDetailPage
      article={article}
      author={author}
      coAuthor={coAuthor}
      readingTime={readingTime}
    />
  );
}
