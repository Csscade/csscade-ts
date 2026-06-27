import { TalksListPage } from "@/ui-kit/pages/Talks/TalksListPage";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTalks } from "@/usecases/talks";

export default function Page() {
  const talks = getAllTalks();
  const authors = getAllAuthors();

  return <TalksListPage talks={talks} authors={authors} />;
}
