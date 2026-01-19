import { LastArticlesList } from "@/ui/articles/LastArticlesList/LastArticlesList";
import { Header } from "@/ui/components/templates/Header/Header";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./HomePage.css";
import { A } from "@/ui/components/atoms/A/A";
import { Footer } from "@/ui/components/templates/Footer/Footer";

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <Header />
      <main className="main">
        <section className="last-articles">
          <h2 className="section__title">Les derniers articles</h2>
          <LastArticlesList />
          <footer>
            <A href={"/articles/page/1"}>Tous les articles</A>
          </footer>
        </section>
      </main>
      <Footer />
    </>
  );
};
