import { LastArticlesList } from "@/ui/articles/LastArticlesList/LastArticlesList";
import { Header } from "@/ui/components/templates/Header/Header";
import { LastTipsList } from "@/ui/tips/LastTipsList/LastTipsList";
import "./HomePage.css";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main id="maincontent" className="main">
        <section className="last-articles">
          <h2 className="section_title">Les derniers articles</h2>
          <LastArticlesList />
          <footer>
            <StyledLink
              href={"/articles/page/1"}
              bordered={true}
              reversed={true}
            >
              Tous les articles
              <FontAwesomeIcon icon={faArrowRightLong} />
            </StyledLink>
          </footer>
        </section>
        <section className="last-tips">
          <h2 className="section_title">Les dernières astuces</h2>
          <LastTipsList />
          <footer>
            <StyledLink href={"/tips/page/1"} bordered={true}>
              Toutes les astuces
              <FontAwesomeIcon icon={faArrowRightLong} />
            </StyledLink>
          </footer>
        </section>
      </main>
    </>
  );
};
