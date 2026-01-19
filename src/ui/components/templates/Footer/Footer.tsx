import { faDiscord, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import "./Footer.css";

const discordUrl = process.env.DISCORD_URL ?? "https://discord.gg/nEEzhGVphQ";
const linkedinUrl =
  process.env.LINKEDIN_URL ?? "https://www.linkedin.com/company/csscade/";

export const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className={"footer__links"}>
        <Link href={discordUrl} passHref>
          <FontAwesomeIcon icon={faDiscord} />
        </Link>
        <Link href={linkedinUrl} passHref>
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
      </div>
      <span>Csscade</span>
    </footer>
  );
};
