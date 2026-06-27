import { notFound } from "next/navigation";
import { CategoryPage } from "@/ui-kit/pages/Articles/CategoryPage";
import { getAllArticles } from "@/usecases/articles";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const normalizedCategory = category.toLowerCase();

  const allArticles = getAllArticles();
  const articles = allArticles.filter((article) =>
    article.categories.some((c) => c.toLowerCase() === normalizedCategory),
  );

  if (articles.length === 0) {
    notFound();
  }

  return <CategoryPage category={category} articles={articles} />;
}

export function generateStaticParams() {
  const allArticles = getAllArticles();
  const categories = new Set<string>();

  for (const article of allArticles) {
    for (const category of article.categories) {
      categories.add(category.toLowerCase());
    }
  }

  return Array.from(categories).map((category) => ({
    category,
  }));
}
