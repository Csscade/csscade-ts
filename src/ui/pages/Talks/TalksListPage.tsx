import type { Talk } from "@/domain/content/talks";
import { TalksList } from "@/ui/talks/TalksList/TalksList";
import "./TalksListPage.css";

interface TalksListPageProps {
  talks: Talk[];
}

export const TalksListPage = ({ talks }: TalksListPageProps) => {
  return (
    <div className="textured-background">
      <header className="talks-list-page__header">
        <div className="talks-list-page__container">
          <h1 className="talks-list-page__title">Conférences</h1>
        </div>
      </header>
      <main id="maincontent" className="talks-list-page">
        <div className="container">
          {talks.length > 0 ? (
            <TalksList talks={talks} />
          ) : (
            <p>Aucune conférence pour le moment.</p>
          )}
        </div>
      </main>
    </div>
  );
};
