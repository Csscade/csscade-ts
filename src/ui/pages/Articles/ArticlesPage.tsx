import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";

export default function ArticlesPage() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );

  return (
    <>
      <Navigation />
      <main className="articles container">
        <h1>Articles</h1>

        <section>
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              publishedAt={article.publishedAt}
              url={article.url}
            />
          ))}
        </section>
      </main>
    </>
  );
}
