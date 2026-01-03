import Link from "next/link";

type ArticleCardProps = {
  title: string;
  publishedAt: string;
  url: string;
  description?: string;
};

export function ArticleCard({ title, url, description }: ArticleCardProps) {
  return (
    <article className="article-card framed-four-corners">
      <h3>{title}</h3>
      {description && (
        <p className="article-card__first-paragraph">{description}</p>
      )}
      <div className="article-card__footer">
        <Link href={url} className="article-card__category">
          category
        </Link>
        <Link href={url}>{">"}</Link>
      </div>
    </article>
  );
}
