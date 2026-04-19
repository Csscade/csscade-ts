import { Wave } from "@/ui/components/atoms/Images/Wave";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import { Badge } from "@/ui/components/molecules/Badge/Badge";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div
        className={"header__wrapper framed-four-corners textured-background"}
      >
        <section className="header__main">
          <div className="header__content">
            <h1 className="header__title">CSScade</h1>
            <small>/kskad/</small>
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
