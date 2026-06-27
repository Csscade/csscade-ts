import { Wave } from "@/ui-kit/components/atoms/Images/Wave";
import { Badge } from "@/ui-kit/components/molecules/Badge/Badge";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./HomeHero.css";

export const HomeHero = () => {
  return (
    <section className="home-hero" aria-labelledby="csscade-title">
      <div className="home-hero__wrapper framed-four-corners textured-background">
        <div className="home-hero__main">
          <div className="home-hero__content">
            <h1 id="csscade-title" className="home-hero__title">
              CSScade
            </h1>
            <small className="home-hero__pronounciation">/kskad/</small>
          </div>
          <p>
            Nous partageons techniques, astuces et bonnes pratiques en HTML,
            CSS, accessibilité, eco-conception,{" "}
            <span lang="en">software craft</span> ou encore dessin.
          </p>
        </div>
        <div className="home-hero__aside">
          <Wave className="home-hero__image" />
          <Badge className="home-hero__badge home-hero__badge--html">
            <StyledLink
              href="/articles/category/html"
              ariaLabel="Voir tous les articles de la catégorie HTML"
            >
              HTML
            </StyledLink>
          </Badge>
          <Badge
            className="home-hero__badge home-hero__badge--css"
            iconPosition="left"
          >
            <StyledLink
              href="/articles/category/css"
              ariaLabel="Voir tous les articles de la catégorie CSS"
            >
              CSS
            </StyledLink>
          </Badge>
          <Badge className="home-hero__badge home-hero__badge--a11y">
            <StyledLink
              href="/articles/category/a11y"
              ariaLabel="Voir tous les articles de la catégorie accessibilité"
            >
              accessibilité
            </StyledLink>
          </Badge>
        </div>
      </div>
    </section>
  );
};
