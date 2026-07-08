import type { Metadata } from "next";
import { TalksListPage } from "@/ui-kit/pages/Talks/TalksListPage";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";

export const metadata: Metadata = {
  title: "Conférences",
  alternates: {
    canonical: "/talks",
  },
};

export default function Page() {
  const talks = getAllTalks();
  const authors = getAllAuthors();

  return <TalksListPage talks={talks} authors={authors} />;
}
