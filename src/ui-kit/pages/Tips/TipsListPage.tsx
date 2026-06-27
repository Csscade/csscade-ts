import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { Pagination } from "@/ui-kit/articles/Pagination/Pagination";
import { TipsList } from "@/ui-kit/tips/TipsList/TipsList";
import "./TipsListPage.css";

interface TipsListPageProps {
  tips: Tip[];
  authors: Author[];
  currentPage: number;
  totalPages: number;
}

export const TipsListPage = ({
  tips,
  authors,
  currentPage,
  totalPages,
}: TipsListPageProps) => {
  return (
    <main id="maincontent" className={"tips_page main"}>
      <h1>Astuces</h1>

      <TipsList tips={tips} authors={authors} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/tips/page"
        />
      )}
    </main>
  );
};
