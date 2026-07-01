import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { Pagination } from "@/ui-kit/articles/Pagination/Pagination";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
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
    <>
      <PageHeader title="Astuces" />
      <main id="maincontent" className="tips_page main">
        <TipsList tips={tips} authors={authors} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/tips/page"
            indexHref="/tips"
          />
        )}
      </main>
    </>
  );
};
