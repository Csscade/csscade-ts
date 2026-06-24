import { getAllTalks } from "@/domain/talks/talks";
import { TalksListPage } from "@/ui/pages/Talks/TalksListPage";

export default function TalksPage() {
  const talks = getAllTalks();

  return <TalksListPage talks={talks} />;
}
