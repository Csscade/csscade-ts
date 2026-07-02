import { readTips } from "@/infrastructure/tips/tips.repository";

const TIPS_PER_PAGE = 12;

export function getAllTips() {
  return readTips();
}

export function getPaginatedTips(page: number) {
  const tips = readTips();
  const sorted = [...tips].sort((a, b) => a.title.localeCompare(b.title));
  const totalPages = Math.ceil(sorted.length / TIPS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const start = (currentPage - 1) * TIPS_PER_PAGE;
  const end = start + TIPS_PER_PAGE;
  return { tips: sorted.slice(start, end), totalPages, currentPage };
}

export function getTotalTipPages() {
  return Math.ceil(readTips().length / TIPS_PER_PAGE);
}
