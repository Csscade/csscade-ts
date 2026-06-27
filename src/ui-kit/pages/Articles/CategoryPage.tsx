import type { Article } from "@/entities/articles/articles";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";

interface CategoryPageProps {
  category: string;
  articles: Article[];
}

export const CategoryPage = ({ category, articles }: CategoryPageProps) => {
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
};
