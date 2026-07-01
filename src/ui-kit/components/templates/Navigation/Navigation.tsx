"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/ui-kit/components/atoms/Images/Logo";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import { ToggleTheme } from "@/ui-kit/components/molecules/ToggleTheme/ToggleTheme";
import "./Navigation.css";

export const Navigation = () => {
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
            <li>
              <StyledLink
                href="/articles/page/1"
                aria-label="Voir tous les articles"
                aria-current={currentPage("/articles")}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </StyledLink>
            </li>
            <li>
              <StyledLink
                href="/tips/page/1"
                aria-label="Voir toutes les astuces"
                aria-current={currentPage("/tips")}
                onClick={() => setIsMenuOpen(false)}
              >
                Astuces
              </StyledLink>
            </li>
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
            <li>
              <StyledLink
                href="/authors"
                aria-label="Voir les auteurs et autrices"
                aria-current={currentPage("/authors")}
                onClick={() => setIsMenuOpen(false)}
              >
                Auteur·ices
              </StyledLink>
            </li>
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
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
};
