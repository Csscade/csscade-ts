import type { Metadata } from "next";
import { TipsListPage } from "@/ui-kit/pages/Tips/TipsListPage";
import { getAllAuthors } from "@/usecases/authors";
import { getPaginatedTips } from "@/usecases/tips";

export default function Page() {
  const { tips, totalPages } = getPaginatedTips(1);
  const authors = getAllAuthors();

  return (
    <TipsListPage
      tips={tips}
      authors={authors}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}

export const metadata: Metadata = {
  title: "Astuces",
  alternates: {
    canonical: "/tips",
  },
};
