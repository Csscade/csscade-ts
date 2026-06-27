import { compareDesc } from "date-fns";
import { readArticles } from "@/infrastructure/articles/articles.repository";

const ARTICLES_PER_PAGE = 4;

export function getAllArticles() {
  return readArticles();
}

export function getLastArticles(limit: number) {
  return [...readArticles()]
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
    )
    .slice(0, limit);
}

export function getPaginatedArticles(page: number) {
  const articles = readArticles();
  const sorted = [...articles].sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );
  const totalPages = Math.ceil(sorted.length / ARTICLES_PER_PAGE);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const end = start + ARTICLES_PER_PAGE;
  return { articles: sorted.slice(start, end), totalPages, currentPage: page };
}

export function getTotalArticlePages() {
  return Math.ceil(readArticles().length / ARTICLES_PER_PAGE);
}
