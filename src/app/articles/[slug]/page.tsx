import { allArticles } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";

export const generateStaticParams = async () =>
  allArticles.map((article) => ({
    slug: article.slug,
  }));

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = allArticles.find((a) => a.slug === slug);
  if (!article) return notFound();

  return (
    <article>
      <h1>{article.title}</h1>
      <p>
        Publié le {format(parseISO(article.publishedAt), "dd/MM/yy")} par{" "}
        <span className="font-semibold">{article.author}</span>
      </p>

      <ArticleContent code={article.body.code} />

      {article.categories && (
        <div className="article-card__footer">
          {article.categories.map((category) => (
            <Link
              key={category}
              href={`/articles/category/${category.toLowerCase()}`}
              className="article-card__category"
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
