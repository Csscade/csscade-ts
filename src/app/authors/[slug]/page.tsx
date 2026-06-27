import { notFound } from "next/navigation";
import { AuthorPage } from "@/ui-kit/pages/Author/AuthorPage";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

export const generateStaticParams = async () => {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
};

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
