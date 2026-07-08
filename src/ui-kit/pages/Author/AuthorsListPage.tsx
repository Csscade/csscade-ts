import type { Author } from "@/entities/authors/authors";
import { AuthorCard } from "@/ui-kit/components/organisms/AuthorCard/AuthorCard";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import "./AuthorsListPage.css";

interface AuthorsListPageProps {
  authors: Author[];
}

export const AuthorsListPage = ({ authors }: AuthorsListPageProps) => {
  return (
    <>
      <PageHeader title="L'équipe éditoriale" />
      <main id="maincontent" className="authors-list-page">
        <div className="container">
          <ul className="authors-list">
            {authors.map((author) => (
              <li key={author.slug} className="authors-list__item">
                <AuthorCard author={author} variant="mini" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};
