import { getAllTalks } from "@/domain/content/talks";
import { TalksListPage } from "@/ui/pages/Talks/TalksListPage";

export default function TalksPage() {
  const talks = getAllTalks();

  return <TalksListPage talks={talks} />;
}
