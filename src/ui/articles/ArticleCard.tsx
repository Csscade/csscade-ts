import { format, parseISO } from "date-fns";
import Link from "next/link";

type ArticleCardProps = {
  title: string;
  publishedAt: string;
  url: string;
  description?: string;
};

export function ArticleCard({
  title,
  publishedAt,
  url,
  description,
}: ArticleCardProps) {
  return (
    <article>
      <h2>
        <Link href={url}>{title}</Link>
      </h2>
      <time dateTime={publishedAt}>
        {format(parseISO(publishedAt), "LLLL d, yyyy")}
      </time>
      {description && <p>{description}</p>}
    </article>
  );
}
