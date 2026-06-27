import { notFound } from "next/navigation";
import { CategoryPage } from "@/ui-kit/pages/Articles/CategoryPage";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const normalizedCategory = category.toLowerCase();

  const hasCategory = (categories: string[]) =>
    categories.some((c) => c.toLowerCase() === normalizedCategory);

  const articles = getAllArticles().filter((a) => hasCategory(a.categories));
  const tips = getAllTips().filter((t) => hasCategory(t.categories));
  const talks = getAllTalks().filter((t) => hasCategory(t.categories));

  if (articles.length === 0 && tips.length === 0 && talks.length === 0) {
    notFound();
  }

  const authors = getAllAuthors();

  return (
    <CategoryPage
      category={category}
      articles={articles}
      tips={tips}
      talks={talks}
      authors={authors}
    />
  );
}

export function generateStaticParams() {
  const categories = new Set<string>();

  for (const article of getAllArticles()) {
    for (const category of article.categories) {
      categories.add(category.toLowerCase());
    }
  }

  for (const tip of getAllTips()) {
    for (const category of tip.categories) {
      categories.add(category.toLowerCase());
    }
  }

  for (const talk of getAllTalks()) {
    for (const category of talk.categories) {
      categories.add(category.toLowerCase());
    }
  }

  return Array.from(categories).map((category) => ({ category }));
}
