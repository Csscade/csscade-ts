import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string; // ex: "/articles/page"
};

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = new Set<number>();

  // toujours la première page
  pages.add(1);

  // pages autour de la page courante
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      pages.add(i);
    }
  }

  // toujours la dernière page
  pages.add(totalPages);

  const orderedPages = Array.from(pages).sort((a, b) => a - b);

  return (
    <nav aria-label="Pagination">
      <ul className="pagination">
        {/* Lien précédent */}
        {currentPage > 1 && (
          <li>
            <Link href={`${basePath}/${currentPage - 1}`} rel="prev">
              ← Précédent
            </Link>
          </li>
        )}

        {orderedPages.map((page, index) => {
          const prevPage = orderedPages[index - 1];

          return (
            <li key={page}>
              {/* Ellipse si trou */}
              {prevPage && page - prevPage > 1 && (
                <span className="pagination-ellipsis">…</span>
              )}

              {page === currentPage ? (
                <span aria-current="page">{page}</span>
              ) : (
                <Link href={`${basePath}/${page}`}>{page}</Link>
              )}
            </li>
          );
        })}

        {/* Lien suivant */}
        {currentPage < totalPages && (
          <li>
            <Link href={`${basePath}/${currentPage + 1}`} rel="next">
              Suivant →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
