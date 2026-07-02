import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./TalksList.css";

interface TalksListProps {
  talks: Talk[];
  authors: Author[];
  showAuthor?: boolean;
  headingLevel?: 2 | 3;
}

export const TalksList = ({
  talks,
  authors,
  showAuthor = true,
  headingLevel = 2,
}: TalksListProps) => {
  const getAuthor = (talk: Talk) => authors.find((a) => a.slug === talk.author);

  return (
    <ul className="talks-list">
      {talks.map((talk) => {
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
              showAuthor={showAuthor}
              headingLevel={headingLevel}
            />
          </li>
        );
      })}
    </ul>
  );
};
