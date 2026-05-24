import type { Article } from "@/domain/content/articles";
import type { Author } from "@/domain/content/authors";
import type { Tip } from "@/domain/content/tips";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import { ArticlesList } from "@/ui/articles/ArticlesList/ArticlesList";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
import "./AuthorPage.css";

interface AuthorPageProps {
  author: Author;
  articles: Article[];
  tips: Tip[];
}

export const AuthorPage = ({ author, articles, tips }: AuthorPageProps) => {
  return (
    <div className="textured-background">
      <header className="author-page__header">
        <div className="author-page__header-wrapper">
          <AuthorCardContent author={author} />
        </div>
      </header>

      <main className="author-page-container">
        {articles.length > 0 && (
          <section className="author-page__articles">
            <h2 className="author-page__title">Ses articles</h2>
            <ArticlesList articles={articles} />
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
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
