import { getAllTalks } from "@/domain/content/talks";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import { TalksListPage } from "@/ui/pages/Talks/TalksListPage";

export default function TalksPage() {
  const talks = getAllTalks();

  return (
    <>
      <Navigation />
      <TalksListPage talks={talks} />
      <Footer />
    </>
  );
}
