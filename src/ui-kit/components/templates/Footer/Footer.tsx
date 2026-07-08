import { faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { DISCORD_URL, LINKEDIN_URL } from "@/config/social-links";
import type { QaScores } from "@/entities/qa-scores/qa-scores";
import { Badge } from "@/ui-kit/components/molecules/Badge/Badge";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";

type FooterProps = {
  qaScores?: QaScores | null;
};

export const Footer = ({ qaScores }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const lighthouseAverage = qaScores
    ? Math.round(
        (qaScores.lighthouse.performance +
          qaScores.lighthouse.accessibility +
          qaScores.lighthouse.bestPractices +
          qaScores.lighthouse.seo) /
          4,
      )
    : null;

  return (
    <footer className={"footer"}>
      <div className={"footer__content"}>
        <div className={"footer__section"}>
          <span className={"footer__brand"}>Csscade</span>
          <p className={"footer__description"}>
            La référence pour les devs passionné·es d'intégration web.
          </p>
        </div>

        <div className={"footer__section"}>
          <h2 className={"footer__title"}>Réseaux Sociaux</h2>
          <div className={"footer__links"}>
            <StyledLink
              href={DISCORD_URL}
              iconOnly={true}
              ariaLabel="Rejoindre le serveur Discord"
            >
              <FontAwesomeIcon icon={faDiscord} aria-hidden />
            </StyledLink>
            <StyledLink
              href={LINKEDIN_URL}
              iconOnly={true}
              ariaLabel="Voir la page LinkedIn de CSScade"
            >
              <FontAwesomeIcon icon={faLinkedin} aria-hidden />
            </StyledLink>
          </div>
        </div>

        <div className={"footer__section"}>
          <h2 className={"footer__title"}>Légal</h2>
          <StyledLink href="/a-propos" className="footer__legal-link">
            À Propos
          </StyledLink>
          <StyledLink href="/mentions-legales" className="footer__legal-link">
            Mentions Légales
          </StyledLink>
        </div>

        {qaScores && (
          <div className={"footer__section"}>
            <h2 className={"footer__title"}>Qualité</h2>
            <div className={"footer__links"}>
              <Badge rounded={true} showIcon={false}>
                <StyledLink
                  href="/a-propos#qualite"
                  ariaLabel="Voir le détail du score Lighthouse sur la page À propos"
                >
                  Lighthouse {lighthouseAverage}
                </StyledLink>
              </Badge>
              <Badge rounded={true} showIcon={false}>
                <StyledLink
                  href="/a-propos#qualite"
                  ariaLabel="Voir le détail du score d'accessibilité Axe sur la page À propos"
                >
                  Axe {qaScores.axe.score}%
                </StyledLink>
              </Badge>
              <Badge rounded={true} showIcon={false}>
                <StyledLink
                  href="/a-propos#qualite"
                  ariaLabel="Voir le détail du score EcoIndex sur la page À propos"
                >
                  EcoIndex {qaScores.ecoindex.grade}
                </StyledLink>
              </Badge>
            </div>
          </div>
        )}
      </div>

      <div className={"footer__bottom"}>
        <p>© {currentYear} Csscade. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
