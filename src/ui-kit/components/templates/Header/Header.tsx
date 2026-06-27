import { Wave } from "@/ui-kit/components/atoms/Images/Wave";
import { Badge } from "@/ui-kit/components/molecules/Badge/Badge";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className={"header__wrapper framed-four-corners"}>
        <section className="header__main">
          <div className="header__content">
            <h1 className="header__title">CSScade</h1>
            <small className="header__pronounciation">/kskad/</small>
          </div>
          <p>
            Nous partageons techniques, astuces et bonnes pratiques en HTML,
            CSS, accessibilité, eco-conception,{" "}
            <span lang="en">software craft</span> ou encore dessin.
          </p>
        </section>
        <section className="header__aside">
          <Wave className="header__image" />
          <Badge className="header__badge header__badge--html">
            <StyledLink
              href="/articles/category/html"
              ariaLabel="Voir tous les articles de la catégorie HTML"
            >
              HTML
            </StyledLink>
          </Badge>
          <Badge
            className="header__badge header__badge--css"
            iconPosition="left"
          >
            <StyledLink
              href="/articles/category/css"
              ariaLabel="Voir tous les articles de la catégorie CSS"
            >
              CSS
            </StyledLink>
          </Badge>
          <Badge className="header__badge header__badge--a11y">
            <StyledLink
              href="/articles/category/a11y"
              ariaLabel="Voir tous les articles de la catégorie accessibilité"
            >
              accessibilité
            </StyledLink>
          </Badge>
        </section>
      </div>
    </header>
  );
};
