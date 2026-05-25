import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";
import "./AboutPage.css";

export default function AboutPage() {
  const githubUrl = "https://github.com/Csscade/csscade-ts";

  return (
    <>
      <Navigation />
      <main className="about-page textured-background">
        <div className="about-page__container">
          <h1 className="about-page__title">À Propos de Csscade</h1>

          <section className="about-page__section">
            <p>
              <strong>Csscade</strong> est une association loi 1901, créée en
              octobre 2021 par Manon Carbonnel. C'est un espace dédié aux
              développeurs et développeuses passionné·es par l'intégration web,
              le design et les technologies front-end modernes.
            </p>
            <p>
              Notre mission est de partager des connaissances, des astuces et
              des retours d'expérience pour élever l'art de l'intégration web au
              niveau qu'il mérite. Que vous soyez débutant·e ou expert·e,
              Csscade se veut être une source d'inspiration et d'apprentissage
              continu.
            </p>
          </section>

          <section className="about-page__section">
            <h2>Ce que nous proposons</h2>
            <ul className="about-page__list">
              <li>
                <strong>Articles de fond :</strong> Des analyses détaillées sur
                les nouvelles spécifications CSS, l'accessibilité et les bonnes
                pratiques.
              </li>
              <li>
                <strong>Astuces (Tips) :</strong> Des solutions rapides et
                efficaces pour résoudre vos problèmes quotidiens d'intégration.
              </li>
              <li>
                <strong>Conférences :</strong> Une sélection de talks inspirants
                pour rester à la pointe des tendances.
              </li>
              <li>
                <strong>Communauté :</strong> Un espace d'échange pour grandir
                ensemble.
              </li>
            </ul>
          </section>

          <section className="about-page__section">
            <h2>Contribuer au projet</h2>
            <p>
              Csscade est un projet open-source et coopératif. Il existe deux
              façons principales de contribuer :
            </p>
            <ul className="about-page__list">
              <li>
                <strong>Le code et le design :</strong> Améliorez le moteur du
                site, l'interface utilisateur ou notre design system
                (Storybook).
              </li>
              <li>
                <strong>Le contenu :</strong> Partagez votre savoir en rédigeant
                des articles ou des astuces en MDX.
              </li>
            </ul>
            <p>
              Nous accordons une importance capitale à l'
              <strong>accessibilité</strong> (respect des normes WCAG 2.2 et
              RGAA 4.1) dans chaque contribution.
            </p>
            <p>Retrouvez toutes les instructions sur notre dépôt GitHub :</p>
            <div className="about-page__cta">
              <StyledLink href={githubUrl} bordered={true}>
                <FontAwesomeIcon icon={faGithub} /> Voir sur GitHub
              </StyledLink>
            </div>
          </section>

          <section className="about-page__section">
            <h2>Rejoignez l'aventure</h2>
            <p>
              Csscade est avant tout une aventure humaine et communautaire. Nous
              croyons fermement au partage et à l'entraide. Vous pouvez nous
              retrouver sur notre{" "}
              <StyledLink href="https://discord.gg/nEEzhGVphQ">
                serveur Discord
              </StyledLink>
              , sur nos différents réseaux sociaux ou nous contacter directement
              par email.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
