import { notFound } from "next/navigation";
import { ArticleContent } from "@/ui/articles/ArticleContent/ArticleContent";
import "./TipPage.css";
import { getAllAuthors } from "@/domain/content/authors";
import { getAllTips } from "@/domain/content/tips";
import { AuthorCardContent } from "@/ui/articles/AuthorCard/AuthorCardContent";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

export const generateStaticParams = async () => {
  const tips = getAllTips();
  return tips.map((tip) => ({
    slug: tip.slug,
  }));
};

export default async function TipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tips = getAllTips();
  const tip = tips.find((t) => t.slug === slug);
  if (!tip) return notFound();

  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === tip.author);

  return (
    <article className="tip-page">
      <header className="tip-page__header">
        <div className="tip-page__header-wrapper">
          <h1 className="tip-page__title">{tip.title}</h1>
          <p className="tip-page__meta">
            <span className="font-semibold">
              par {author ? author.name : tip.author}
            </span>
          </p>
          {tip.categories && (
            <div className="tip-page__categories">
              {tip.categories.map((category) => (
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
      <ArticleContent content={tip.content} />
      <div className="tip-page__footer">
        {author && <AuthorCardContent author={author} />}
      </div>
    </article>
  );
}
