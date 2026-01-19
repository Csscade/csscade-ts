import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPaginatedArticles,
  getTotalArticlePages,
} from "@/domain/articles/pagination";
import { ArticleCard } from "@/ui/articles/ArticleCard/ArticleCard";
import { Pagination } from "@/ui/articles/Pagination/Pagination";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";

type PageProps = {
  params: {
    page: string;
  };
};

export default async function ArticlesPage({ params }: PageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { articles, totalPages } = getPaginatedArticles(currentPage);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className={"page main"}>
        <h1>Articles</h1>

        <section>
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              publishedAt={article.publishedAt}
              url={article.url}
              categories={article.categories}
            />
          ))}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/articles/page"
        />
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  const totalPages = getTotalArticlePages();

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export const dynamic = "error";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  const currentPage = Number(page);

  return {
    title: currentPage === 1 ? "Articles" : `Articles – page ${currentPage}`,
    alternates: {
      canonical: `/articles/page/${currentPage}`,
    },
  };
}
