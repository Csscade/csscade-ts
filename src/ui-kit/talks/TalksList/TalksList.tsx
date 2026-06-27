import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import "./TalksList.css";

interface TalksListProps {
  talks: Talk[];
  authors: Author[];
  showAuthor?: boolean;
}

export const TalksList = ({
  talks,
  authors,
  showAuthor = true,
}: TalksListProps) => {
  const getAuthor = (talk: Talk) => authors.find((a) => a.slug === talk.author);

  return (
    <div className="talks-list">
      {talks.map((talk) => {
        const author = getAuthor(talk);
        return (
          <ArticleCard
            key={talk.slug}
            title={talk.title}
            publishedAt={talk.publishedAt}
            url={`/talks/${talk.slug}`}
            author={author ? author.name : talk.author}
            authorUrl={author ? `/authors/${author.slug}` : undefined}
            categories={talk.categories}
            showAuthor={showAuthor}
            hasVideo={!!talk.youtubeId}
            hasTranscript={!!talk.content}
            hasSlides={!!talk.slidesUrl}
          />
        );
      })}
    </div>
  );
};
