import { getAllTips } from "@/domain/content/tips";

const TIPS_PER_PAGE = 12;

export function getPaginatedTips(page: number) {
  const allTips = getAllTips();
  // Sort by title as there is no date
  const sortedTips = [...allTips].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const totalTips = sortedTips.length;
  const totalPages = Math.ceil(totalTips / TIPS_PER_PAGE);

  const start = (page - 1) * TIPS_PER_PAGE;
  const end = start + TIPS_PER_PAGE;

  return {
    tips: sortedTips.slice(start, end),
    totalPages,
    currentPage: page,
  };
}

export function getTotalTipPages() {
  const allTips = getAllTips();
  return Math.ceil(allTips.length / TIPS_PER_PAGE);
}
