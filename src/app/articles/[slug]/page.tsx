import { allArticles } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./ArticlePage.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

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
    <>
      <Navigation />
      <article className="article-page">
        <header className="article-page__header">
          <h1 className="article-page__title">{article.title}</h1>
          <p>
            Publié le {format(parseISO(article.publishedAt), "dd/MM/yy")} par{" "}
            <span className="font-semibold">{article.author}</span>
          </p>
          {article.categories && (
            <div className="article-page__categories">
              {article.categories.map((category) => (
                <StyledLink
                  key={category}
                  href={`/articles/category/${category.toLowerCase()}`}
                  className="article-card__category"
                  bordered={true}
                >
                  {category}
                </StyledLink>
              ))}
            </div>
          )}
        </header>
        <ArticleContent code={article.body.code} />
        {/* TODO : AuthorCard */}
      </article>
      <Footer />
    </>
  );
}
