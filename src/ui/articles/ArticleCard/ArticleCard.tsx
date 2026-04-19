import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import "./ArticleCard.css";

type ArticleCardProps = {
  title: string;
  publishedAt: string;
  url: string;
  description?: string;
  categories?: string[];
};

export function ArticleCard({
  title,
  url,
  description,
  categories,
}: ArticleCardProps) {
  return (
    <article className="article-card framed-four-corners">
      <h3 className={"article-card__title"}>
        <StyledLink reversed href={url} ariaLabel={`Lire l'article : ${title}`}>
          {title}
        </StyledLink>
      </h3>
      {description && (
        <p className="article-card__first-paragraph">{description}</p>
      )}
      {categories && (
        <div className="article-card__footer">
          {categories && (
            <div className="article-card__footer">
              {categories.map((category) => (
                <StyledLink
                  key={category}
                  href={`/articles/category/${category.toLowerCase()}`}
                  bordered
                  reversed
                  className="article-card__category"
                  ariaLabel={`Voir tous les articles de la catégorie ${category}`}
                >
                  {category}
                </StyledLink>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
