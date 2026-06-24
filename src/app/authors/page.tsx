import { getAllAuthors } from "@/domain/authors/authors";
import { AuthorsListPage } from "@/ui/pages/Author/AuthorsListPage";

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return <AuthorsListPage authors={authors} />;
}
