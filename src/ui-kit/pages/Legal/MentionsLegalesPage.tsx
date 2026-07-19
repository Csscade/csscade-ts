import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import "./MentionsLegalesPage.css";

export const MentionsLegalesPage = () => {
  return (
    <>
      <PageHeader title="Mentions Légales" />
      <main id="maincontent" tabIndex={-1} className="legal-page">
        <div className="legal-page__container">
          <section className="legal-page__section">
            <h2>1. Édition du site</h2>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
              la confiance dans l'économie numérique, il est précisé aux
              utilisateur·ices du site internet <strong>csscade.fr</strong>{" "}
              l'identité des différent·es intervenant·es dans le cadre de sa
              réalisation et de son suivi :
            </p>
            <p>
              <strong>Propriétaire du site :</strong> Association Csscade (Loi
              1901) — Contact :{" "}
              <StyledLink href="mailto:hello@csscade.fr">
                hello@csscade.fr
              </StyledLink>
            </p>
            <p>
              <strong>SIREN :</strong> 909 170 334
              <br />
              <strong>SIRET (siège) :</strong> 909 170 334 00017
              <br />
              <strong>N° RNA :</strong> W353022209
              <br />
              <strong>Catégorie juridique :</strong> Association déclarée
              <br />
              <strong>Activité principale (APE) :</strong> 62.02A — Conseil en
              systèmes et logiciels informatiques
            </p>
            <p>
              <strong>Directeur·rice de la publication :</strong> L'équipe
              Csscade
            </p>
          </section>

          <section className="legal-page__section">
            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par GitHub, Inc., dont le siège social est
              situé 88 Colin P Kelly Jr Street, San Francisco, CA 94107,
              États-Unis.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>3. Propriété intellectuelle et contrefaçons</h2>
            <p>
              Csscade est propriétaire des droits de propriété intellectuelle ou
              détient les droits d'usage sur les éléments techniques et
              graphiques du site internet : logos, graphismes, architecture,
              icônes et sons. Les contenus rédactionnels (articles, astuces,
              présentations de talks, images et vidéos qui les accompagnent)
              restent la propriété de leurs auteur·ices respectif·ves, qui en
              conservent la paternité — voir la section 4.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication,
              adaptation de tout ou partie des éléments du site, quel que soit
              le moyen ou le procédé utilisé, est interdite, sauf autorisation
              écrite préalable de Csscade ou, pour les contenus rédactionnels,
              de leur auteur·ice.
            </p>
            <p>
              Cette restriction ne concerne pas le code source du site, publié
              en open source sous licence MIT sur{" "}
              <StyledLink href="https://github.com/Csscade/csscade-ts">
                GitHub
              </StyledLink>
              . La licence MIT s'applique uniquement au code (composants,
              logique applicative, outillage) — elle ne couvre ni les contenus
              rédactionnels (articles, astuces, présentations de talks), ni la
              marque et les éléments graphiques de Csscade, qui restent soumis
              aux droits décrits ci-dessus.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>4. Droit d'auteur des contributions</h2>
            <p>
              Les articles, astuces et contenus publiés sur Csscade sont rédigés
              par des personnes qui en conservent la paternité. Lorsque du
              contenu a été initialement publié sur un blog ou une source
              externe, un lien vers la publication originale est
              systématiquement indiqué, dès lors que cela est précisé, par
              respect du droit d'auteur.
            </p>
            <p>
              Toute personne ayant contribué à Csscade peut demander le retrait
              de son contenu à tout moment, par simple envoi d'un e-mail à{" "}
              <StyledLink href="mailto:hello@csscade.fr">
                hello@csscade.fr
              </StyledLink>
              . La demande sera traitée dans les meilleurs délais.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>5. Limitations de responsabilité</h2>
            <p>
              Csscade ne pourra être tenu pour responsable des dommages directs
              et indirects causés au matériel de l'utilisateur·ice lors de
              l'accès au site csscade.fr.
            </p>
            <p>
              Csscade décline toute responsabilité quant à l'utilisation qui
              pourrait être faite des informations et contenus présents sur
              csscade.fr.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>6. Crédits</h2>
            <p>
              <strong>Design :</strong> Amy Ndiaye
            </p>
            <p>
              <strong>Logo :</strong> Dorian Guilmain
            </p>
            <p>
              <strong>Police Poppins :</strong> Indian Type Foundry & Jonny
              Pinhorn, sous licence SIL Open Font License 1.1 —{" "}
              <StyledLink href="https://fonts.google.com/specimen/Poppins">
                fonts.google.com/specimen/Poppins
              </StyledLink>
            </p>
            <p>
              <strong>Police Playfair Display :</strong> Claus Eggers Sørensen,
              sous licence SIL Open Font License 1.1 —{" "}
              <StyledLink href="https://fonts.google.com/specimen/Playfair+Display">
                fonts.google.com/specimen/Playfair+Display
              </StyledLink>
            </p>
            <p>
              <strong>Police Fira Code :</strong> Nikita Prokopov, basée sur
              Fira Mono (Mozilla, Erik Spiekermann & Carrois Type Design), sous
              licence SIL Open Font License 1.1 —{" "}
              <StyledLink href="https://fonts.google.com/specimen/Fira+Code">
                fonts.google.com/specimen/Fira+Code
              </StyledLink>
            </p>
            <p>
              <strong>Police OpenDyslexic :</strong> Abbie Gonzalez, sous
              licence SIL Open Font License 1.1 —{" "}
              <StyledLink href="https://opendyslexic.org">
                opendyslexic.org
              </StyledLink>
            </p>
            <p>
              <strong>Police Luciole :</strong> Laurent Bourcellier & Jonathan
              Perez, sous licence Creative Commons Attribution 4.0 —{" "}
              <StyledLink href="https://luciole-vision.com">
                luciole-vision.com
              </StyledLink>
            </p>
            <p>
              <strong>Police Comic Sans 😏 (Comic Relief) :</strong> Jeff Davis,
              sous licence SIL Open Font License 1.1 —{" "}
              <StyledLink href="https://fonts.google.com/specimen/Comic+Relief">
                fonts.google.com/specimen/Comic+Relief
              </StyledLink>
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
