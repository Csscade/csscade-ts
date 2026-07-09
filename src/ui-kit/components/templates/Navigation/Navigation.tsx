"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/ui-kit/components/atoms/Images/Logo";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import { ToggleFont } from "@/ui-kit/components/molecules/ToggleFont/ToggleFont";
import { ToggleTheme } from "@/ui-kit/components/molecules/ToggleTheme/ToggleTheme";
import "./Navigation.css";

interface NavigationProps {
  hasArticles: boolean;
  hasTips: boolean;
  hasTalks: boolean;
  hasAuthors: boolean;
}

export const Navigation = ({
  hasArticles,
  hasTips,
  hasTalks,
  hasAuthors,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentPage = (prefix: string, exact = false): "page" | undefined => {
    if (!pathname) return undefined;
    const match = exact ? pathname === prefix : pathname.startsWith(prefix);
    return match ? "page" : undefined;
  };

  return (
    <header className="navigation">
      <a className="skip-link" href="#maincontent">
        Aller au contenu principal
      </a>
      <div className="container">
        <Logo />
        <button
          type="button"
          className="burger-button"
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>
        <nav
          aria-label="Navigation principale"
          className={`nav ${isMenuOpen ? "open" : ""}`}
        >
          <ul>
            <li>
              <StyledLink
                href="/"
                aria-label="Voir la page d'accueil"
                aria-current={currentPage("/", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </StyledLink>
            </li>
            {hasArticles && (
              <li>
                <StyledLink
                  href="/articles"
                  aria-label="Voir tous les articles"
                  aria-current={currentPage("/articles")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Articles
                </StyledLink>
              </li>
            )}
            {hasTips && (
              <li>
                <StyledLink
                  href="/tips"
                  aria-label="Voir toutes les astuces"
                  aria-current={currentPage("/tips")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Astuces
                </StyledLink>
              </li>
            )}
            {hasTalks && (
              <li>
                <StyledLink
                  href="/talks"
                  aria-label="Voir toutes les conférences"
                  aria-current={currentPage("/talks")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Conférences
                </StyledLink>
              </li>
            )}
            {hasAuthors && (
              <li>
                <StyledLink
                  href="/authors"
                  aria-label="Voir l'équipe éditoriale"
                  aria-current={currentPage("/authors")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Équipe éditoriale
                </StyledLink>
              </li>
            )}
            <li>
              <StyledLink
                href="/a-propos"
                aria-label="A propos de Csscade"
                aria-current={currentPage("/a-propos")}
                onClick={() => setIsMenuOpen(false)}
              >
                A Propos
              </StyledLink>
            </li>
          </ul>
          <ToggleFont />
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
};
