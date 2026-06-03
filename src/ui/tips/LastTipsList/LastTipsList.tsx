import { getAllAuthors } from "@/domain/content/authors";
import { getAllTips, type Tip } from "@/domain/content/tips";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./LastTipsList.css";

interface LastTipsProps {
  limit?: number;
}

export const LastTipsList = ({ limit = 3 }: LastTipsProps) => {
  const allTips = getAllTips();
  const tips = [...allTips].slice(0, limit > 0 ? limit : undefined);

  const allAuthors = getAllAuthors();
  const getAuthor = (tip: Tip) => {
    return allAuthors.find((a) => a.slug === tip.author);
  };

  return (
    <div className="last-tips__list">
      {tips.map((tip) => {
        const author = getAuthor(tip);
        return (
          <ArticleCard
            key={tip.slug}
            title={tip.title}
            publishedAt=""
            url={`/tips/${tip.slug}`}
            author={author ? author.name : tip.author}
            categories={tip.categories}
          />
        );
      })}
    </div>
  );
};
