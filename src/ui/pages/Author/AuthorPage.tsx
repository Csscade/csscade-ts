import type { Article, Author, Tip } from "contentlayer/generated";
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
    <main className="author-page-container">
      <section className="author-page__header">
        <AuthorCardContent author={author} />
      </section>

      {articles.length > 0 && (
        <section className="author-page__articles">
          <h2 className="author-page__title">
            Articles écrits par {author.name}
          </h2>
          <ArticlesList articles={articles} />
        </section>
      )}

      {tips.length > 0 && (
        <section className="author-page__tips">
          <h2 className="author-page__title">
            Tips proposés par {author.name}
          </h2>
          <div className="author-page__articles-list">
            {tips.map((tip) => (
              <ArticleCard
                key={tip._id}
                title={tip.title}
                url={tip.url}
                categories={tip.categories}
                publishedAt=""
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
