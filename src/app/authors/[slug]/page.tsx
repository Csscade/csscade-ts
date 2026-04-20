import { allArticles, allAuthors, allTips } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import { AuthorPage } from "@/ui/pages/Author/AuthorPage";

export const generateStaticParams = async () =>
  allAuthors.map((author) => ({
    slug: author.slug,
  }));

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const author = allAuthors.find((a) => a.slug === slug);

  if (!author) {
    return notFound();
  }

  const articles = allArticles.filter((article) => article.author === slug);
  const tips = allTips.filter((tip) => tip.author === slug);

  return (
    <>
      <Navigation />
      <AuthorPage author={author} articles={articles} tips={tips} />
      <Footer />
    </>
  );
}
