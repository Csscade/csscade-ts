import { Wave } from "@/ui/components/Images/Wave";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header container">
      <section className="header__content">
        <h1 className="header__title">Passionné·es d'intégration web</h1>
        <p>
          Nous partageons techniques, astuces et bonnes pratiques en HTML, CSS,
          accessibilité, eco-conception, software craft ou encore dessin.
        </p>
      </section>
      <section className="header__aside">
        <Wave className="header__image" />
      </section>
    </header>
  );
};
