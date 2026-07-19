import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import "./TalksListPage.css";

interface TalksListPageProps {
  talks: Talk[];
  authors: Author[];
}

export const TalksListPage = ({ talks, authors }: TalksListPageProps) => {
  return (
    <>
      <PageHeader title="Conférences" />
      <main id="maincontent" tabIndex={-1} className="talks-list-page">
        <div className="container">
          {talks.length > 0 ? (
            <TalksList talks={talks} authors={authors} />
          ) : (
            <p>Aucune conférence pour le moment.</p>
          )}
        </div>
      </main>
    </>
  );
};
