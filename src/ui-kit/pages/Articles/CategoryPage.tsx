import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import type { Tip } from "@/entities/tips/tips";
import { ArticlesList } from "@/ui-kit/articles/ArticlesList/ArticlesList";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import { TipsList } from "@/ui-kit/tips/TipsList/TipsList";
import "./CategoryPage.css";

interface CategoryPageProps {
  category: string;
  articles: Article[];
  tips: Tip[];
  talks: Talk[];
  authors: Author[];
}

export const CategoryPage = ({
  category,
  articles,
  tips,
  talks,
  authors,
}: CategoryPageProps) => {
  return (
    <>
      <PageHeader title={`Catégorie ${category}`} />
      <main id="maincontent" tabIndex={-1} className="category-page main">
        {articles.length > 0 && (
          <section>
            <h2 className="category-page__section-title">Articles</h2>
            <ArticlesList
              articles={articles}
              authors={authors}
              headingLevel={3}
            />
          </section>
        )}

        {talks.length > 0 && (
          <section>
            <h2 className="category-page__section-title">Conférences</h2>
            <TalksList talks={talks} authors={authors} headingLevel={3} />
          </section>
        )}

        {tips.length > 0 && (
          <section>
            <h2 className="category-page__section-title">Tips</h2>
            <TipsList tips={tips} authors={authors} headingLevel={3} />
          </section>
        )}
      </main>
    </>
  );
};
