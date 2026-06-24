import { getAllAuthors } from "@/domain/authors/authors";
import type { Tip } from "@/domain/tips/tips";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./TipsList.css";

interface TipsListProps {
  tips: Tip[];
  showAuthor?: boolean;
}

export const TipsList = ({ tips, showAuthor = true }: TipsListProps) => {
  const allAuthors = getAllAuthors();
  const getAuthor = (tip: Tip) => {
    return allAuthors.find((a) => a.slug === tip.author);
  };

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
          />
        );
      })}
    </div>
  );
};
