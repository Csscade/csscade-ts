import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./LastArticlesList.css";

interface LastArticlesProps {
  limit?: number;
}

export const LastArticlesList = ({ limit = 4 }: LastArticlesProps) => {
  const articles = allArticles
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
    )
    .slice(0, limit > 0 ? limit : undefined);

  return (
    <div className="last-articles__list">
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          title={article.title}
          publishedAt={article.publishedAt}
          url={article.url}
        />
      ))}
    </div>
  );
};
