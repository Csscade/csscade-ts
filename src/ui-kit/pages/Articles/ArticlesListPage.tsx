import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import { ArticlesList } from "@/ui-kit/articles/ArticlesList/ArticlesList";
import { Pagination } from "@/ui-kit/articles/Pagination/Pagination";
import "./ArticlesListPage.css";

interface ArticlesListPageProps {
  articles: Article[];
  authors: Author[];
  currentPage: number;
  totalPages: number;
}

export const ArticlesListPage = ({
  articles,
  authors,
  currentPage,
  totalPages,
}: ArticlesListPageProps) => {
  return (
    <main id="maincontent" className={"articles_page main"}>
      <h1>Articles</h1>

      <ArticlesList articles={articles} authors={authors} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/articles/page"
      />
    </main>
  );
};
