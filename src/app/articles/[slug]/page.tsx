import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/ui-kit/pages/Articles/ArticleDetailPage";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";

export const generateStaticParams = async () => {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

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

  return <ArticleDetailPage article={article} author={author} />;
}
