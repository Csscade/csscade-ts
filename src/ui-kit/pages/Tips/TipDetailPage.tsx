import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { ArticleContent } from "@/ui-kit/articles/ArticleContent/ArticleContent";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { AuthorCreditLink } from "@/ui-kit/components/atoms/AuthorCreditLink/AuthorCreditLink";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import type { AuthorCredit } from "@/usecases/authors";
import "./TipDetailPage.css";

interface TipDetailPageProps {
  tip: Tip;
  author: Author | undefined;
  coAuthor: AuthorCredit | undefined;
}

export const TipDetailPage = ({
  tip,
  author,
  coAuthor,
}: TipDetailPageProps) => {
  return (
    <main id="maincontent" tabIndex={-1}>
      <article className="tip-page">
        <header className="tip-page__header">
          <div className="tip-page__header-wrapper">
            <h1 className="tip-page__title">{tip.title}</h1>
            <p className="tip-page__meta">
              <span className="font-semibold">
                par{" "}
                {author ? (
                  <StyledLink href={`/authors/${author.slug}`} prefetch={false}>
                    {author.name}
                  </StyledLink>
                ) : (
                  tip.author
                )}
              </span>
              {coAuthor && (
                <>
                  <span>&amp;</span>
                  <span className="font-semibold">
                    <AuthorCreditLink credit={coAuthor} />
                  </span>
                </>
              )}
            </p>
            {tip.categories && (
              <div className="tip-page__categories">
                {tip.categories.map((category) => (
                  <StyledLink
                    key={category}
                    href={`/articles/category/${category.toLowerCase()}`}
                    className="article-card__category"
                    bordered
                    prefetch={false}
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
          {author && <AuthorCardContent author={author} headingLevel="h2" />}
        </div>
      </article>
    </main>
  );
};
