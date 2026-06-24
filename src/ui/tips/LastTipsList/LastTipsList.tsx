import { getAllAuthors } from "@/domain/authors/authors";
import { getAllTips, type Tip } from "@/domain/tips/tips";
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
    <ul className="last-tips__list">
      {tips.map((tip) => {
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
