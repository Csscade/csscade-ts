import { LastArticlesList } from "@/ui/articles/LastArticlesList";
import { Header } from "@/ui/components/templates/Header/Header";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <Header />
      <main className="main">
        <section className="last-articles container">
          <h2>Les derniers articles</h2>
          <LastArticlesList />
        </section>
      </main>
    </>
  );
};
