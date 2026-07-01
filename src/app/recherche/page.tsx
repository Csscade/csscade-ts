import { Suspense } from "react";
import {
  SearchResultsFallback,
  SearchResultsPage,
} from "@/ui-kit/pages/Search/SearchResultsPage";
import { getAllArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";
import { getAllTips } from "@/usecases/tips";

export default function Page() {
  const articles = getAllArticles();
  const tips = getAllTips();
  const talks = getAllTalks();
  const authors = getAllAuthors();

  return (
    <Suspense fallback={<SearchResultsFallback />}>
      <SearchResultsPage
        articles={articles}
        tips={tips}
        talks={talks}
        authors={authors}
      />
    </Suspense>
  );
}
