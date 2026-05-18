import { compareDesc } from "date-fns";
import { getAllArticles } from "@/domain/content/articles";

const ARTICLES_PER_PAGE = 4;

export function getPaginatedArticles(page: number) {
  const allArticles = getAllArticles();
  const sortedArticles = [...allArticles].sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );

  const totalArticles = sortedArticles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  const start = (page - 1) * ARTICLES_PER_PAGE;
  const end = start + ARTICLES_PER_PAGE;

  return {
    articles: sortedArticles.slice(start, end),
    totalPages,
    currentPage: page,
  };
}

export function getTotalArticlePages() {
  const allArticles = getAllArticles();
  return Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
}
