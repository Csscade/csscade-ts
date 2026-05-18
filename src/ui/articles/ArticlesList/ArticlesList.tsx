import type { Article } from "@/lib/content";
import { getAllAuthors } from "@/lib/content";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./ArticlesList.css";

interface ArticlesListProps {
  articles: Article[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  const allAuthors = getAllAuthors();
  const getAuthor = (article: Article) => {
    return allAuthors.find((a) => a.slug === article.author);
  };

  return (
    <div className="articles__list">
      {articles.map((article) => {
        const author = getAuthor(article);
        return (
          <ArticleCard
            key={article.slug}
            title={article.title}
            publishedAt={article.publishedAt}
            url={`/articles/${article.slug}`}
            author={author ? author.name : article.author}
            categories={article.categories}
          />
        );
      })}
    </div>
  );
};
