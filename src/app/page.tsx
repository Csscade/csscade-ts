import { HomePage } from "@/ui-kit/pages/Home/HomePage";
import { getLastArticles } from "@/usecases/articles";
import { getAllAuthors } from "@/usecases/authors";
import { getAllTips } from "@/usecases/tips";

export default function Home() {
  const articles = getLastArticles(3);
  const authors = getAllAuthors();
  const tips = getAllTips();

  return <HomePage articles={articles} authors={authors} tips={tips} />;
}
