import {
  faChalkboard,
  faFileLines,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const icons = (
    <>
      {hasVideo && (
        <div title="Vidéo disponible">
          <FontAwesomeIcon icon={faPlayCircle} aria-hidden="true" />
          <span className="sr-only">Replay à visionner</span>
        </div>
      )}
      {hasTranscript && (
        <div title="Transcript disponible">
          <FontAwesomeIcon icon={faFileLines} aria-hidden="true" />
          <span className="sr-only">Transcript disponible</span>
        </div>
      )}
      {hasSlides && (
        <div title="Slides disponibles">
          <FontAwesomeIcon icon={faChalkboard} aria-hidden="true" />
          <span className="sr-only">Slides disponibles</span>
        </div>
      )}
    </>
  );

  const hasAnyIcon = hasVideo || hasTranscript || hasSlides;

  return (
    <article className="article-card framed-four-corners">
      <StyledLink
        className="article-card__header"
        href={url}
        ariaLabel={`Lire l'article : ${title}`}
      >
        <h2>{title}</h2>
      </StyledLink>

      {hasAnyIcon && !categories && (
        <div className="article-card__metadata">{icons}</div>
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

          {hasAnyIcon && <div className="article-card__metadata">{icons}</div>}
        </div>
      )}
    </article>
  );
}
