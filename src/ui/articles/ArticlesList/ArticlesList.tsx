import type { Article } from "contentlayer/generated";
import { allAuthors } from "contentlayer/generated";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./ArticlesList.css";

interface ArticlesListProps {
  articles: Article[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  const getAuthor = (article: Article) => {
    return allAuthors.find((a) => a.slug === article.author);
  };

  return (
    <div className="articles__list">
      {articles.map((article) => {
        const author = getAuthor(article);
        return (
          <ArticleCard
            key={article._id}
            title={article.title}
            publishedAt={article.publishedAt}
            url={article.url}
            author={author ? author.name : article.author}
            categories={article.categories}
          />
        );
      })}
    </div>
  );
};
