import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./LastTipsList.css";

interface LastTipsListProps {
  tips: Tip[];
  authors: Author[];
  limit?: number;
}

export const LastTipsList = ({
  tips,
  authors,
  limit = 3,
}: LastTipsListProps) => {
  const visible = tips.slice(0, limit > 0 ? limit : undefined);

  const getAuthor = (tip: Tip) => authors.find((a) => a.slug === tip.author);

  return (
    <ul className="last-tips__list">
      {visible.map((tip) => {
        const author = getAuthor(tip);
        return (
          <li key={tip.slug}>
            <ArticleCard
              title={tip.title}
              publishedAt=""
              url={`/tips/${tip.slug}`}
              author={author ? author.name : tip.author}
              categories={tip.categories}
            />
          </li>
        );
      })}
    </ul>
  );
};
