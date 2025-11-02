import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArticleCard } from "@/ui/articles/ArticleCard";
import { Header } from "@/ui/components/Header/Header";
import { Navigation } from "@/ui/components/Navigation/Navigation";

export default function Home() {
  const Articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );

  return (
    <main className="main">
      <Navigation />
      <Header />
      <section>
        {Articles.map((article) => (
          <ArticleCard key={article._id} {...article} />
        ))}
      </section>
    </main>
  );
}
