import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { getAllAuthors } from "@/domain/content/authors";
import { getAllTalks } from "@/domain/content/talks";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import "./TalkPage.css";

export const generateStaticParams = async () => {
  const talks = getAllTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
};

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const talks = getAllTalks();
  const talk = talks.find((t) => t.slug === slug);
  if (!talk) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === talk.author);

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
                  reversed
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
          <iframe
            className="talk-page__video"
            src={`https://www.youtube.com/embed/${talk.youtubeId}`}
            title={`Vidéo de la conférence : ${talk.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
}
