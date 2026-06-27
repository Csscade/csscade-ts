import type { Author } from "@/entities/authors/authors";
import { AuthorCard } from "@/ui-kit/components/organisms/AuthorCard/AuthorCard";
import "./AuthorsListPage.css";

interface AuthorsListPageProps {
  authors: Author[];
}

export const AuthorsListPage = ({ authors }: AuthorsListPageProps) => {
  return (
    <div className="textured-background">
      <header className="authors-list-page__header">
        <div className="authors-list-page__container">
          <h1 className="authors-list-page__title">Les auteur·ices</h1>
        </div>
      </header>
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
    </div>
  );
};
