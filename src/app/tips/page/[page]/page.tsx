import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaginatedTips, getTotalTipPages } from "@/domain/tips/pagination";
import { Pagination } from "@/ui/articles/Pagination/Pagination";
import { TipsList } from "@/ui/tips/TipsList/TipsList";
import "./TipsPage.css";

type PageProps = {
  params: {
    page: string;
  };
};

export default async function TipsPage({ params }: PageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { tips, totalPages } = getPaginatedTips(currentPage);

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <main id="maincontent" className={"tips_page main"}>
      <h1>Astuces</h1>

      <TipsList tips={tips} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/tips/page"
        />
      )}
    </main>
  );
}

export function generateStaticParams() {
  const totalPages = getTotalTipPages();

  if (totalPages === 0) {
    return [{ page: "1" }];
  }

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
    title: currentPage === 1 ? "Astuces" : `Astuces – page ${currentPage}`,
    alternates: {
      canonical: `/tips/page/${currentPage}`,
    },
  };
}
