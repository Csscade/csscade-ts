import {
  faDiscord,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DISCORD_URL, LINKEDIN_URL } from "@/config/social-links";
import type { QaScores } from "@/entities/qa-scores/qa-scores";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import { QaScoresDetails } from "@/ui-kit/components/organisms/QaScores/QaScoresDetails";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import "./AboutPage.css";

const githubUrl = "https://github.com/Csscade/csscade-ts";

type AboutPageProps = {
  qaScores: QaScores | null;
};

export const AboutPage = ({ qaScores }: AboutPageProps) => {
  return (
    <>
      <PageHeader title="À Propos" />
      <main id="maincontent" className="about-page">
        <div className="about-page__container">
          <section className="about-page__section">
            <h2>Notre mission</h2>
            <p>
              <strong>Csscade</strong> est une association loi 1901 dédiée à
              l'intégration web, au front-end et au partage de connaissances
              autour du web moderne.
            </p>
            <p>
              Créée en 2021 par Manon Carbonnel, Csscade est née d'un constat
              simple : l'intégration web est souvent réduite à "faire du CSS",
              alors qu'elle demande en réalité des compétences techniques,
              créatives et humaines essentielles à la qualité du web.
            </p>
            <p>
              Nous pensons qu'un bon front-end ne se limite pas à une interface
              esthétique. Il doit être accessible, performant, maintenable,
              éco-conçu et agréable à utiliser comme à développer.
            </p>
          </section>

          <section className="about-page__section">
            <h2>Ce que vous trouverez ici</h2>
            <ul className="about-page__content-list">
              <li className="about-page__content-item">
                <h3>Articles</h3>
                <p>
                  Des analyses détaillées sur les nouvelles spécifications CSS,
                  l'accessibilité et les bonnes pratiques.
                </p>
                <StyledLink href="/articles" bordered={true}>
                  Lire les articles
                </StyledLink>
              </li>
              <li className="about-page__content-item">
                <h3>Astuces</h3>
                <p>
                  Des solutions rapides et efficaces pour résoudre vos problèmes
                  quotidiens d'intégration.
                </p>
                <StyledLink href="/tips" bordered={true}>
                  Voir les astuces
                </StyledLink>
              </li>
              <li className="about-page__content-item">
                <h3>Conférences</h3>
                <p>
                  Une sélection de talks inspirants pour rester à la pointe des
                  tendances front-end.
                </p>
                <StyledLink href="/talks" bordered={true}>
                  Voir les conférences
                </StyledLink>
              </li>
              <li className="about-page__content-item">
                <h3>Design System</h3>
                <p>
                  Notre bibliothèque de composants, documentée et testée dans
                  Storybook, pour un front-end cohérent et accessible.
                </p>
                <StyledLink href="/storybook" bordered={true} target="_blank">
                  <FontAwesomeIcon icon={faPalette} /> Voir le Storybook
                </StyledLink>
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
                site, l'UX ou notre design system.
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
            <div className="about-page__cta">
              <StyledLink href={githubUrl} bordered={true}>
                <FontAwesomeIcon icon={faGithub} /> Voir sur GitHub
              </StyledLink>
            </div>
          </section>

          <QaScoresDetails qaScores={qaScores} />

          <section className="about-page__section">
            <h2>Rejoindre la communauté</h2>
            <p>
              Csscade est avant tout une aventure humaine et communautaire. Nous
              croyons fermement au partage et à l'entraide. Rejoignez-nous pour
              échanger, poser vos questions et grandir ensemble.
            </p>
            <div className="about-page__cta">
              <StyledLink href={DISCORD_URL} bordered={true}>
                <FontAwesomeIcon icon={faDiscord} /> Rejoindre le Discord
              </StyledLink>
              <StyledLink href={LINKEDIN_URL} bordered={true}>
                <FontAwesomeIcon icon={faLinkedin} /> Suivre sur LinkedIn
              </StyledLink>
              <StyledLink href="mailto:hello@csscade.fr" bordered={true}>
                <FontAwesomeIcon icon={faEnvelope} /> Nous contacter
              </StyledLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
