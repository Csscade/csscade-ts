import { getAllAuthors } from "@/domain/content/authors";
import type { Talk } from "@/domain/content/talks";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import "./TalksList.css";

interface TalksListProps {
  talks: Talk[];
  showAuthor?: boolean;
}

export const TalksList = ({ talks, showAuthor = true }: TalksListProps) => {
  const allAuthors = getAllAuthors();
  const getAuthor = (talk: Talk) => {
    return allAuthors.find((a) => a.slug === talk.author);
  };

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
