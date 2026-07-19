import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import type { Tip } from "@/entities/tips/tips";
import { ArticleCard } from "@/ui-kit/articles/ArticleCard/ArticleCard";
import { ArticlesList } from "@/ui-kit/articles/ArticlesList/ArticlesList";
import { AuthorCardContent } from "@/ui-kit/articles/AuthorCard/AuthorCardContent";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import "./AuthorPage.css";
import type React from "react";

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
    <div className="author-page">
      <div className="author-page__header">
        <div className="author-page__header-wrapper">
          <AuthorCardContent author={author} headingLevel="h1" />
        </div>
      </div>

      <main id="maincontent" tabIndex={-1}>
        {articles.length > 0 && (
          <section className="author-page__articles">
            <div className="author-page__section-container">
              <h2 className="author-page__title">Ses articles</h2>
              <ArticlesList
                articles={articles}
                authors={authorAsArray}
                showAuthor={false}
                headingLevel={3}
              />
            </div>
          </section>
        )}

        {tips.length > 0 && (
          <section className="author-page__tips">
            <div className="author-page__section-container">
              <h2 className="author-page__title">Ses tips</h2>
              <div className="author-page__articles-list">
                {tips.map((tip, index) => (
                  <div
                    key={tip.slug}
                    style={
                      {
                        "--card-index": Math.min(index, 8),
                      } as React.CSSProperties
                    }
                  >
                    <ArticleCard
                      title={tip.title}
                      url={`/tips/${tip.slug}`}
                      categories={tip.categories}
                      publishedAt=""
                      author={author.name}
                      showAuthor={false}
                      headingLevel={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {talks.length > 0 && (
          <section className="author-page__talks">
            <div className="author-page__section-container">
              <h2 className="author-page__title">Ses conférences</h2>
              <TalksList
                talks={talks}
                authors={authorAsArray}
                showAuthor={false}
                headingLevel={3}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
