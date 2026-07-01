"use client";

import { useSearchParams } from "next/navigation";
import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import type { Tip } from "@/entities/tips/tips";
import { ArticlesList } from "@/ui-kit/articles/ArticlesList/ArticlesList";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import { TipsList } from "@/ui-kit/tips/TipsList/TipsList";
import "./SearchResultsPage.css";

interface SearchResultsPageProps {
  articles: Article[];
  tips: Tip[];
  talks: Talk[];
  authors: Author[];
}

export const SearchResultsFallback = () => (
  <>
    <PageHeader title="Recherche" />
    <main id="maincontent" className="search-results main" />
  </>
);

export const SearchResultsPage = ({
  articles,
  tips,
  talks,
  authors,
}: SearchResultsPageProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const q = query.toLowerCase().trim();

  const filteredArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.categories.some((c) => c.toLowerCase().includes(q)),
      )
    : [];

  const filteredTips = q
    ? tips.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.categories.some((c) => c.toLowerCase().includes(q)),
      )
    : [];

  const filteredTalks = q
    ? talks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.abstract.toLowerCase().includes(q) ||
          t.categories.some((c) => c.toLowerCase().includes(q)),
      )
    : [];

  const hasResults =
    filteredArticles.length > 0 ||
    filteredTips.length > 0 ||
    filteredTalks.length > 0;

  return (
    <>
      <PageHeader title={q ? `Résultats pour « ${q} »` : "Recherche"} />
      <main id="maincontent" className="search-results main">
        {q && !hasResults && (
          <p className="search-results__empty">
            Aucun résultat pour cette recherche.
          </p>
        )}

        {filteredArticles.length > 0 && (
          <section>
            <h2 className="search-results__section-title">Articles</h2>
            <ArticlesList
              articles={filteredArticles}
              authors={authors}
              headingLevel={3}
            />
          </section>
        )}

        {filteredTalks.length > 0 && (
          <section>
            <h2 className="search-results__section-title">Conférences</h2>
            <TalksList
              talks={filteredTalks}
              authors={authors}
              headingLevel={3}
            />
          </section>
        )}

        {filteredTips.length > 0 && (
          <section>
            <h2 className="search-results__section-title">Tips</h2>
            <TipsList tips={filteredTips} authors={authors} headingLevel={3} />
          </section>
        )}
      </main>
    </>
  );
};
