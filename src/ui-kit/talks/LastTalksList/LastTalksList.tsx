import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./LastTalksList.css";

interface LastTalksListProps {
  talks: Talk[];
  authors: Author[];
  limit?: number;
}

export const LastTalksList = ({
  talks,
  authors,
  limit = 3,
}: LastTalksListProps) => {
  const visible = talks.slice(0, limit > 0 ? limit : undefined);

  const getAuthor = (talk: Talk) => authors.find((a) => a.slug === talk.author);

  return (
    <ul className="last-talks__list">
      {visible.map((talk) => {
        const author = getAuthor(talk);
        return (
          <li key={talk.slug}>
            <ArticleCard
              title={talk.title}
              publishedAt={talk.publishedAt}
              url={`/talks/${talk.slug}`}
              author={author ? author.name : talk.author}
              authorUrl={author ? `/authors/${author.slug}` : undefined}
              categories={talk.categories}
              headingLevel={3}
            />
          </li>
        );
      })}
    </ul>
  );
};
