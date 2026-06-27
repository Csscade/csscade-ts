import { AuthorsListPage } from "@/ui-kit/pages/Author/AuthorsListPage";
import { getAllAuthors } from "@/usecases/authors";

export default function Page() {
  const authors = getAllAuthors();

  return <AuthorsListPage authors={authors} />;
}
