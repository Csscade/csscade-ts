import { faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

const discordUrl = process.env.DISCORD_URL ?? "https://discord.gg/nEEzhGVphQ";
const linkedinUrl =
  process.env.LINKEDIN_URL ?? "https://www.linkedin.com/company/csscade/";

export const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className={"footer__links"}>
        <StyledLink href={discordUrl} iconOnly={true}>
          <FontAwesomeIcon icon={faDiscord} />
        </StyledLink>
        <StyledLink href={linkedinUrl} iconOnly={true}>
          <FontAwesomeIcon icon={faLinkedin} />
        </StyledLink>
      </div>
      <span>Csscade</span>
    </footer>
  );
};
