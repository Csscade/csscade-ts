import type { Article } from "contentlayer/generated";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";

interface ArticlesListProps {
  articles: Article[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  return (
    <div className="articles__list">
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          title={article.title}
          publishedAt={article.publishedAt}
          url={article.url}
          categories={article.categories}
        />
      ))}
    </div>
  );
};
