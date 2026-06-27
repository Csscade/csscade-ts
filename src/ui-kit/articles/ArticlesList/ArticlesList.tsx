import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./ArticlesList.css";

interface ArticlesListProps {
  articles: Article[];
  authors: Author[];
  showAuthor?: boolean;
}

export const ArticlesList = ({
  articles,
  authors,
  showAuthor = true,
}: ArticlesListProps) => {
  const getAuthor = (article: Article) =>
    authors.find((a) => a.slug === article.author);

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
