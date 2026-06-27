import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TipsListPage } from "@/ui-kit/pages/Tips/TipsListPage";
import { getAllAuthors } from "@/usecases/authors";
import { getPaginatedTips, getTotalTipPages } from "@/usecases/tips";

type PageProps = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { tips, totalPages } = getPaginatedTips(currentPage);

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  const authors = getAllAuthors();

  return (
    <TipsListPage
      tips={tips}
      authors={authors}
      currentPage={currentPage}
      totalPages={totalPages}
    />
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
