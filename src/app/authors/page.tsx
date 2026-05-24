import { getAllAuthors } from "@/domain/content/authors";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import { AuthorsListPage } from "@/ui/pages/Author/AuthorsListPage";

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <>
      <Navigation />
      <AuthorsListPage authors={authors} />
      <Footer />
    </>
  );
}
