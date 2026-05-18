import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./ArticlePage.css";
import { getAllArticles, getAllAuthors } from "@/lib/content";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

export const generateStaticParams = async () => {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const articles = getAllArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === article.author);

  return (
    <>
      <Navigation />
      <article className="article-page textured-background">
        <header className="article-page__header">
          <div className="article-page__header-wrapper">
            <h1 className="article-page__title">{article.title}</h1>
            <p className="article-page__meta">
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
                    bordered
                    reversed
                  >
                    {category}
                  </StyledLink>
                ))}
              </div>
            )}
          </div>
        </header>
        <ArticleContent content={article.content} />
        <div className="article-page__footer">
          {author && <AuthorCardContent author={author} />}
        </div>
      </article>
      <Footer />
    </>
  );
}
