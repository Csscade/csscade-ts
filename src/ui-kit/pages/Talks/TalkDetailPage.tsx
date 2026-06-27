import { format, parseISO } from "date-fns";
import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { ArticleContent } from "@/ui-kit/articles/ArticleContent/ArticleContent";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./TalkDetailPage.css";

interface TalkDetailPageProps {
  talk: Talk;
  author: Author | undefined;
}

export const TalkDetailPage = ({ talk, author }: TalkDetailPageProps) => {
  return (
    <article className="talk-page">
      <header className="talk-page__header">
        <div className="talk-page__header-wrapper">
          <h1 className="talk-page__title">{talk.title}</h1>
          <p className="talk-page__meta">
            Publié le {format(parseISO(talk.publishedAt), "dd/MM/yy")}
            <span className="font-semibold">
              par {author ? author.name : talk.author}
            </span>
          </p>
          {talk.level && (
            <p className="talk-page__level">
              Niveau : <span className="capitalize">{talk.level}</span>
            </p>
          )}
          {talk.categories && (
            <div className="talk-page__categories">
              {talk.categories.map((category) => (
                <StyledLink
                  key={category}
                  href={`/articles/category/${category.toLowerCase()}`}
                  className="article-card__category"
                  bordered
                  ariaLabel={`Voir tous les articles de la catégorie ${category}`}
                >
                  {category}
                </StyledLink>
              ))}
            </div>
          )}
          {talk.abstract && (
            <p className="talk-page__abstract-intro">{talk.abstract}</p>
          )}
        </div>
      </header>

      {talk.youtubeId && (
        <div className="talk-page__video-wrapper">
          <div className="talk-page__video-inner">
            <iframe
              className="talk-page__video"
              src={`https://www.youtube.com/embed/${talk.youtubeId}`}
              title={`Vidéo de la conférence : ${talk.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <main id="maincontent" className="talk-page__container">
        {talk.slidesUrl && (
          <section className="talk-page__slides">
            <StyledLink href={talk.slidesUrl} bordered>
              Voir les slides
            </StyledLink>
          </section>
        )}

        {talk.content && (
          <section className="talk-page__transcript">
            <h2>Transcript</h2>
            <ArticleContent content={talk.content} />
          </section>
        )}
      </main>

      <div className="talk-page__footer">
        {author && <AuthorCardContent author={author} />}
      </div>
    </article>
  );
};
