import { PageHeader } from "@/ui-kit/components/templates/PageHeader/PageHeader";
import "./MentionsLegalesPage.css";

export const MentionsLegalesPage = () => {
  return (
    <>
      <PageHeader title="Mentions Légales" />
      <main id="maincontent" className="legal-page">
        <div className="legal-page__container">
          <section className="legal-page__section">
            <h2>1. Édition du site</h2>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
              la confiance dans l'économie numérique, il est précisé aux
              utilisateurs du site internet <strong>csscade.fr</strong>{" "}
              l'identité des différents intervenants dans le cadre de sa
              réalisation et de son suivi :
            </p>
            <p>
              <strong>Propriétaire du site :</strong> Association Csscade (Loi
              1901) — Contact :{" "}
              <a href="mailto:hello@csscade.fr">hello@csscade.fr</a>
            </p>
            <p>
              <strong>Directeur de la publication :</strong> L'équipe Csscade
            </p>
          </section>

          <section className="legal-page__section">
            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par OVH SAS, dont le siège social est situé 2
              rue Kellermann — 59100 Roubaix — France, joignable au 1007.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>3. Propriété intellectuelle et contrefaçons</h2>
            <p>
              Csscade est propriétaire des droits de propriété intellectuelle ou
              détient les droits d'usage sur tous les éléments accessibles sur
              le site internet, notamment les textes, images, graphismes, logos,
              vidéos, architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication,
              adaptation de tout ou partie des éléments du site, quel que soit
              le moyen ou le procédé utilisé, est interdite, sauf autorisation
              écrite préalable de Csscade.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>4. Droit d'auteur des contributions</h2>
            <p>
              Les articles, astuces et contenus publiés sur Csscade sont rédigés
              par des contributeur·ices qui en conservent la paternité. Lorsque
              du contenu a été initialement publié sur un blog ou une source
              externe, un lien vers la publication originale est
              systématiquement indiqué, dès lors que l'auteur·ice le précise,
              par respect du droit d'auteur.
            </p>
            <p>
              Toute personne ayant contribué à Csscade peut demander le retrait
              de son contenu à tout moment, par simple envoi d'un e-mail à{" "}
              <a href="mailto:hello@csscade.fr">hello@csscade.fr</a>. La demande
              sera traitée dans les meilleurs délais.
            </p>
          </section>

          <section className="legal-page__section">
            <h2>5. Limitations de responsabilité</h2>
            <p>
              Csscade ne pourra être tenu pour responsable des dommages directs
              et indirects causés au matériel de l'utilisateur lors de l'accès
              au site csscade.fr.
            </p>
            <p>
              Csscade décline toute responsabilité quant à l'utilisation qui
              pourrait être faite des informations et contenus présents sur
              csscade.fr.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
