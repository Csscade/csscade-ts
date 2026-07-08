import type { Metadata } from "next";
import { HomePage } from "@/ui-kit/pages/Home/HomePage";
import { getLastArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getLastTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const articles = getLastArticles(3);
  const authors = getAllAuthors();
  const tips = getAllTips();
  const talks = getLastTalks(3);

  return (
    <HomePage articles={articles} authors={authors} tips={tips} talks={talks} />
  );
}
