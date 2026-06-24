import { notFound } from "next/navigation";
import { getAllArticles } from "@/domain/articles/articles";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";

type PageProps = {
  params: Promise<{ category: string }>;
};

function normalizeCategory(category: string) {
  return category.toLowerCase();
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const normalizedCategory = normalizeCategory(category);

  const allArticles = getAllArticles();
  const articles = allArticles.filter((article) =>
    article.categories.some((c) => normalizeCategory(c) === normalizedCategory),
  );

  if (articles.length === 0) {
    notFound();
  }

  return (
    <main id="maincontent" className="main">
      <h1>Articles – {category}</h1>

      <section>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            publishedAt={article.publishedAt}
            url={`/articles/${article.slug}`}
            categories={article.categories}
          />
        ))}
      </section>
    </main>
  );
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
