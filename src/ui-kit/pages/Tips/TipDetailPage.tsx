import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { ArticleContent } from "@/ui-kit/articles/ArticleContent/ArticleContent";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./TipDetailPage.css";

interface TipDetailPageProps {
  tip: Tip;
  author: Author | undefined;
}

export const TipDetailPage = ({ tip, author }: TipDetailPageProps) => {
  return (
    <main id="maincontent">
      <article className="tip-page">
        <header className="tip-page__header">
          <div className="tip-page__header-wrapper">
            <h1 className="tip-page__title">{tip.title}</h1>
            <p className="tip-page__meta">
              <span className="font-semibold">
                par{" "}
                {author ? (
                  <StyledLink href={`/authors/${author.slug}`}>
                    {author.name}
                  </StyledLink>
                ) : (
                  tip.author
                )}
              </span>
            </p>
            {tip.categories && (
              <div className="tip-page__categories">
                {tip.categories.map((category) => (
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
          </div>
        </header>
        <ArticleContent content={tip.content} />
        <div className="tip-page__footer">
          {author && <AuthorCardContent author={author} />}
        </div>
      </article>
    </main>
  );
};
