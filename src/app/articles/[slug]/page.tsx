import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./ArticlePage.css";
import { allArticles, allAuthors } from "contentlayer/generated";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
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

  const author = allAuthors.find((a) => a.slug === article.author);

  return (
    <>
      <Navigation />
      <article className="article-page">
        <header className="article-page__header">
          <h1 className="article-page__title">{article.title}</h1>
          <p>
            Publié le {format(parseISO(article.publishedAt), "dd/MM/yy")}
            <span className="font-semibold">
              par {author ? author.name : article.author}
            </span>
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
        {author && <AuthorCardContent author={author} />}
      </article>
      <Footer />
    </>
  );
}
