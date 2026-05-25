import { Footer } from "@/ui/components/templates/Footer/Footer";
import { Navigation } from "@/ui/components/templates/Navigation/Navigation";

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      <main
        className="textured-background"
        style={{ padding: "8rem 2rem 4rem", minHeight: "80vh" }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ marginBottom: "2rem", fontSize: "2.5rem" }}>
            Mentions Légales
          </h1>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              1. Édition du site
            </h2>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
              la confiance dans l'économie numérique, il est précisé aux
              utilisateurs du site internet <strong>csscade.fr</strong>{" "}
              l'identité des différents intervenants dans le cadre de sa
              réalisation et de son suivi :
            </p>
            <p>
              <strong>Propriétaire du site :</strong> Csscade - Contact :
              hello@csscade.fr
            </p>
            <p>
              <strong>Directeur de la publication :</strong> L'équipe Csscade
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              2. Hébergement
            </h2>
            <p>
              Le Site est hébergé par OVH SAS, dont le siège social est situé 2
              rue Kellermann - 59100 Roubaix - France, joignable au 1007.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              3. Propriété intellectuelle et contrefaçons
            </h2>
            <p>
              Csscade est propriétaire des droits de propriété intellectuelle ou
              détient les droits d’usage sur tous les éléments accessibles sur
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

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              4. Limitations de responsabilité
            </h2>
            <p>
              Csscade ne pourra être tenu pour responsable des dommages directs
              et indirects causés au matériel de l’utilisateur, lors de l’accès
              au site csscade.fr.
            </p>
            <p>
              Csscade décline toute responsabilité quant à l’utilisation qui
              pourrait être faite des informations et contenus présents sur
              csscade.fr.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
