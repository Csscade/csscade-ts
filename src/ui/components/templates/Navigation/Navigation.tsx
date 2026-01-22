"use client";

import { useState } from "react";
import { Logo } from "@/ui/components/atoms/Images/Logo";
import { ToggleTheme } from "@/ui/components/molecules/ToggleTheme/ToggleTheme";
import "./Navigation.css";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="navigation">
      <div className="container">
        <Logo />
        <button
          type="button"
          className="burger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`burger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <StyledLink
                href="/"
                aria-label="Voir la page d'accueil"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </StyledLink>
            </li>
            <li>
              <StyledLink
                href="/articles/page/1"
                aria-label="Voir tous les articles"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </StyledLink>
            </li>
            <li>
              <StyledLink
                href="/tips/page/1"
                aria-label="Voir toutes les astuces"
              >
                Astuces
              </StyledLink>
            </li>
            <li>
              <StyledLink href="#" aria-label="A propos de Csscade">
                A Propos
              </StyledLink>
            </li>
          </ul>
          <ToggleTheme />
        </nav>
      </div>
    </section>
  );
};
