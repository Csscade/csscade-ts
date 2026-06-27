import { format, parseISO } from "date-fns";
import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import { ArticleContent } from "@/ui-kit/articles/ArticleContent/ArticleContent";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./ArticleDetailPage.css";

interface ArticleDetailPageProps {
  article: Article;
  author: Author | undefined;
}

export const ArticleDetailPage = ({
  article,
  author,
}: ArticleDetailPageProps) => {
  return (
    <article className="article-page">
      <header className="article-page__header">
        <div className="article-page__header-wrapper">
          <h1 className="article-page__title">{article.title}</h1>
          <p className="article-page__meta">
            Publié le {format(parseISO(article.publishedAt), "dd/MM/yy")}
            <span className="font-semibold">
              par {author ? author.name : article.author}
            </span>
          </p>
          {article.categories && (
            <div className="article-page__categories">
              {article.categories.map((category) => (
                <StyledLink
                  key={category}
                  href={`/articles/category/${category.toLowerCase()}`}
                  className="article-card__category"
                  bordered
                  reversed
                >
                  {category}
                </StyledLink>
              ))}
            </div>
          )}
        </div>
      </header>
      <ArticleContent content={article.content} />
      <div className="article-page__footer">
        {author && <AuthorCardContent author={author} />}
      </div>
    </article>
  );
};
