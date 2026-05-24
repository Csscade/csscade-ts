import Link from "next/link";
import type { Author } from "@/domain/content/authors";
import { Avatar } from "@/ui/components/atoms/Avatar/Avatar";
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
      <main className="authors-list-page">
        <div className="container">
          <ul className="authors-list">
            {authors.map((author) => (
              <li key={author.slug} className="authors-list__item">
                <Link
                  href={`/authors/${author.slug}`}
                  className="authors-list__link"
                >
                  <Avatar
                    src={author.avatar}
                    alt={author.name}
                    size={120}
                    className="authors-list__avatar"
                    border
                  />
                  <span className="authors-list__name">{author.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
