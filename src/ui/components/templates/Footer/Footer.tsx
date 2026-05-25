import { faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

const discordUrl = process.env.DISCORD_URL ?? "https://discord.gg/nEEzhGVphQ";
const linkedinUrl =
  process.env.LINKEDIN_URL ?? "https://www.linkedin.com/company/csscade/";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

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
          <h4 className={"footer__title"}>Réseaux Sociaux</h4>
          <div className={"footer__links"}>
            <StyledLink href={discordUrl} iconOnly={true} ariaLabel="Discord">
              <FontAwesomeIcon icon={faDiscord} />
            </StyledLink>
            <StyledLink href={linkedinUrl} iconOnly={true} ariaLabel="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </StyledLink>
          </div>
        </div>

        <div className={"footer__section"}>
          <h4 className={"footer__title"}>Légal</h4>
          <StyledLink href="/a-propos" className="footer__legal-link">
            À Propos
          </StyledLink>
          <StyledLink href="/mentions-legales" className="footer__legal-link">
            Mentions Légales
          </StyledLink>
        </div>
      </div>

      <div className={"footer__bottom"}>
        <p>© {currentYear} Csscade. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
