import { allArticles } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const ARTICLES_PER_PAGE = 1;

export function getPaginatedArticles(page: number) {
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
  return Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
}
