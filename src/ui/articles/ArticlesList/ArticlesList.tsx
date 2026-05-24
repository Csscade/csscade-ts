import type { Article } from "@/domain/content/articles";
import { getAllAuthors } from "@/domain/content/authors";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./ArticlesList.css";

interface ArticlesListProps {
  articles: Article[];
  showAuthor?: boolean;
}

export const ArticlesList = ({
  articles,
  showAuthor = true,
}: ArticlesListProps) => {
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
            authorUrl={author ? `/authors/${author.slug}` : undefined}
            categories={article.categories}
            showAuthor={showAuthor}
          />
        );
      })}
    </div>
  );
};
