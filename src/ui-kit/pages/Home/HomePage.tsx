import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Article } from "@/entities/articles/articles";
import type { Author } from "@/entities/authors/authors";
import type { Tip } from "@/entities/tips/tips";
import { LastArticlesList } from "@/ui-kit/articles/LastArticlesList/LastArticlesList";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import { Header } from "@/ui-kit/components/templates/Header/Header";
import { LastTipsList } from "@/ui-kit/tips/LastTipsList/LastTipsList";
import "./HomePage.css";

interface HomePageProps {
  articles: Article[];
  authors: Author[];
  tips: Tip[];
}

export const HomePage = ({ articles, authors, tips }: HomePageProps) => {
  return (
    <>
      <Header />
      <main id="maincontent" className="main">
        <section className="last-articles">
          <h2 className="section_title">Les derniers articles</h2>
          <LastArticlesList articles={articles} authors={authors} />
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
          <LastTipsList tips={tips} authors={authors} />
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
