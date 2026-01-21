import { LastArticlesList } from "@/ui/articles/LastArticlesList/LastArticlesList";
import { Header } from "@/ui/components/templates/Header/Header";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./HomePage.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
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
            <StyledLink
              href={"/articles/page/1"}
              bordered={true}
              reversed={true}
            >
              Tous les articles
            </StyledLink>
          </footer>
        </section>
      </main>
      <Footer />
    </>
  );
};
