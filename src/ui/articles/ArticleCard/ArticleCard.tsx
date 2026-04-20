import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import "./ArticleCard.css";

type ArticleCardProps = {
  title: string;
  publishedAt: string;
  url: string;
  author?: string;
  description?: string;
  categories?: string[];
};

export function ArticleCard({
  title,
  url,
  author,
  description,
  categories,
}: ArticleCardProps) {
  return (
    <article className="article-card framed-four-corners">
      <StyledLink
        className="article-card__header"
        href={url}
        ariaLabel={`Lire l'article : ${title}`}
      >
        <h2>{title}</h2>
        {author && <small className="article-card__author">Par {author}</small>}
      </StyledLink>

      {description && (
        <p className="article-card__first-paragraph">{description}</p>
      )}

      {categories && (
        <div className="article-card__footer">
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
      )}
    </article>
  );
}
