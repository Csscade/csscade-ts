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
    <main id="maincontent">
      <article className="article-page">
        <header className="article-page__header">
          <div className="article-page__header-wrapper">
            <h1 className="article-page__title">{article.title}</h1>
            <p className="article-page__meta">
              Publié le {format(parseISO(article.publishedAt), "dd/MM/yy")}
              <span className="font-semibold">
                par{" "}
                {author ? (
                  <StyledLink href={`/authors/${author.slug}`}>
                    {author.name}
                  </StyledLink>
                ) : (
                  article.author
                )}
              </span>
              {article.coAuthor && (
                <>
                  <span>&amp;</span>
                  <span className="font-semibold">{article.coAuthor}</span>
                </>
              )}
            </p>
            {article.categories && (
              <div className="article-page__categories">
                {article.categories.map((category) => (
                  <StyledLink
                    key={category}
                    href={`/articles/category/${category.toLowerCase()}`}
                    className="article-card__category"
                    bordered
                  >
                    {category}
                  </StyledLink>
                ))}
              </div>
            )}
            {article.originalUrl && (
              <p className="article-page__original">
                <StyledLink
                  href={article.originalUrl}
                  ariaLabel="Lire l'article original (lien externe, ouvre un nouvel onglet)"
                >
                  Lire l&apos;article original
                </StyledLink>
              </p>
            )}
          </div>
        </header>
        <ArticleContent content={article.content} />
        <div className="article-page__footer">
          {author && <AuthorCardContent author={author} />}
        </div>
      </article>
    </main>
  );
};
