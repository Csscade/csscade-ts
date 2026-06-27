import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import type { Tip } from "@/entities/tips/tips";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import { ArticlesList } from "@/ui-kit/articles/ArticlesList/ArticlesList";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import "./AuthorPage.css";

interface AuthorPageProps {
  author: Author;
  articles: Article[];
  tips: Tip[];
  talks: Talk[];
}

export const AuthorPage = ({
  author,
  articles,
  tips,
  talks,
}: AuthorPageProps) => {
  const authorAsArray = [author];

  return (
    <div className="textured-background">
      <header className="author-page__header">
        <div className="author-page__header-wrapper">
          <AuthorCardContent author={author} />
        </div>
      </header>

      <main id="maincontent" className="author-page-container">
        {articles.length > 0 && (
          <section className="author-page__articles">
            <h2 className="author-page__title">Ses articles</h2>
            <ArticlesList
              articles={articles}
              authors={authorAsArray}
              showAuthor={false}
            />
          </section>
        )}

        {tips.length > 0 && (
          <section className="author-page__tips">
            <h2 className="author-page__title">Ses tips</h2>
            <div className="author-page__articles-list">
              {tips.map((tip) => (
                <ArticleCard
                  key={tip.slug}
                  title={tip.title}
                  url={`/tips/${tip.slug}`}
                  categories={tip.categories}
                  publishedAt=""
                  author={author.name}
                  showAuthor={false}
                />
              ))}
            </div>
          </section>
        )}

        {talks.length > 0 && (
          <section className="author-page__talks">
            <h2 className="author-page__title">Ses conférences</h2>
            <TalksList
              talks={talks}
              authors={authorAsArray}
              showAuthor={false}
            />
          </section>
        )}
      </main>
    </div>
  );
};
