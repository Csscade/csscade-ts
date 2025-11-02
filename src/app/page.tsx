import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArticleCard } from "@/ui/articles/ArticleCard";
import { ToggleTheme } from "@/ui/components/ToggleTheme/ToggleTheme";

export default function Home() {
  const Articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );

  return (
    <main className="mx-auto max-w-xl py-8">
      <ToggleTheme />
      <h1 className="mb-8 text-center text-2xl font-black">Csscade</h1>
      {Articles.map((article) => (
        <ArticleCard key={article._id} {...article} />
      ))}
    </main>
  );
}
