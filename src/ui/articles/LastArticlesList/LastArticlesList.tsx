import { compareDesc } from "date-fns";
import { type Article, getAllArticles } from "@/domain/content/articles";
import { getAllAuthors } from "@/domain/content/authors";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./LastArticlesList.css";

interface LastArticlesProps {
  limit?: number;
}

export const LastArticlesList = ({ limit = 3 }: LastArticlesProps) => {
  const allArticles = getAllArticles();
  const articles = [...allArticles]
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
    )
    .slice(0, limit > 0 ? limit : undefined);

  const allAuthors = getAllAuthors();
  const getAuthor = (article: Article) => {
    return allAuthors.find((a) => a.slug === article.author);
  };

  return (
    <ul className="last-articles__list">
      {articles.map((article) => {
        const author = getAuthor(article);
        return (
          <li key={article.slug}>
            <ArticleCard
              title={article.title}
              publishedAt={article.publishedAt}
              url={`/articles/${article.slug}`}
              author={author ? author.name : article.author}
              categories={article.categories}
            />
          </li>
        );
      })}
    </ul>
  );
};
