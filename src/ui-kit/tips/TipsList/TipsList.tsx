import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./TipsList.css";

interface TipsListProps {
  tips: Tip[];
  authors: Author[];
  showAuthor?: boolean;
  headingLevel?: 2 | 3;
}

export const TipsList = ({
  tips,
  authors,
  showAuthor = true,
  headingLevel = 2,
}: TipsListProps) => {
  const getAuthor = (tip: Tip) => authors.find((a) => a.slug === tip.author);

  return (
    <div className="tips__list">
      {tips.map((tip) => {
        const author = getAuthor(tip);
        return (
          <ArticleCard
            key={tip.slug}
            title={tip.title}
            publishedAt=""
            url={`/tips/${tip.slug}`}
            author={author ? author.name : tip.author}
            authorUrl={author ? `/authors/${author.slug}` : undefined}
            categories={tip.categories}
            showAuthor={showAuthor}
            headingLevel={headingLevel}
          />
        );
      })}
    </div>
  );
};
