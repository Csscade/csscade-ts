import type { Article } from "@/domain/articles/articles";
import type { Author } from "@/domain/authors/authors";
import type { Talk } from "@/domain/talks/talks";
import type { Tip } from "@/domain/tips/tips";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import { ArticlesList } from "@/ui/articles/ArticlesList/ArticlesList";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
import { TalksList } from "@/ui/talks/TalksList/TalksList";
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
            <ArticlesList articles={articles} showAuthor={false} />
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
            <TalksList talks={talks} showAuthor={false} />
          </section>
        )}
      </main>
    </div>
  );
};
