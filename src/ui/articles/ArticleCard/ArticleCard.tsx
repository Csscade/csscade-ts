import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import "./ArticleCard.css";

type ArticleCardProps = {
  title: string;
  publishedAt: string;
  url: string;
  author?: string;
  authorUrl?: string;
  description?: string;
  categories?: string[];
  showAuthor?: boolean;
  hasVideo?: boolean;
  hasTranscript?: boolean;
  hasSlides?: boolean;
};

export function ArticleCard({
  title,
  url,
  author,
  authorUrl,
  description,
  categories,
  showAuthor = true,
  hasVideo,
  hasTranscript,
  hasSlides,
}: ArticleCardProps) {
  const badges = (
    <>
      {hasVideo && (
        <span className="article-card__badge" title="Vidéo disponible">
          Vidéo
        </span>
      )}
      {hasTranscript && (
        <span className="article-card__badge" title="Transcript disponible">
          Transcript
        </span>
      )}
      {hasSlides && (
        <span className="article-card__badge" title="Slides disponibles">
          Slides
        </span>
      )}
    </>
  );

  const hasAnyBadge = hasVideo || hasTranscript || hasSlides;

  return (
    <article className="article-card framed-four-corners">
      <StyledLink
        className="article-card__header"
        href={url}
        ariaLabel={`Lire l'article : ${title}`}
      >
        <h2>{title}</h2>
      </StyledLink>

      {hasAnyBadge && !categories && (
        <div className="article-card__metadata">{badges}</div>
      )}

      {showAuthor && author && (
        <div className="article-card__author-container">
          {authorUrl ? (
            <StyledLink href={authorUrl} className="article-card__author">
              Par {author}
            </StyledLink>
          ) : (
            <small className="article-card__author">Par {author}</small>
          )}
        </div>
      )}

      {description && (
        <p className="article-card__first-paragraph">{description}</p>
      )}

      {categories && (
        <div className="article-card__footer">
          <div className="article-card__categories">
            {categories.map((category) => (
              <StyledLink
                key={category}
                href={`/articles/category/${category.toLowerCase()}`}
                bordered
                className="article-card__category"
                ariaLabel={`Voir tous les articles de la catégorie ${category}`}
              >
                {category}
              </StyledLink>
            ))}
          </div>

          {hasAnyBadge && (
            <div className="article-card__metadata">{badges}</div>
          )}
        </div>
      )}
    </article>
  );
}
