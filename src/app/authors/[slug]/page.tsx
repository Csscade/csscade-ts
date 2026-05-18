import { notFound } from "next/navigation";
import { getAllArticles, getAllAuthors, getAllTips } from "@/lib/content";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import { AuthorPage } from "@/ui/pages/Author/AuthorPage";

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

  return (
    <>
      <Navigation />
      <AuthorPage author={author} articles={articles} tips={tips} />
      <Footer />
    </>
  );
}
