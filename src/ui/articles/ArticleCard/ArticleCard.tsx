import Link from "next/link";

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
      <h3>
        <Link href={url}>{title}</Link>
      </h3>
      {description && (
        <p className="article-card__first-paragraph">{description}</p>
      )}
      {categories && (
        <div className="article-card__footer">
          {categories && (
            <div className="article-card__footer">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/articles/category/${category.toLowerCase()}`}
                  className="article-card__category"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
