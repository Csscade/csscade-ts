import { Wave } from "@/ui/components/Header/Wave";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <section className="header__content">
        <h1 className="header__title">Passionné·es d'intégration web</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
          viverra mi. Donec laoreet, lacus ac mollis placerat, magna nisi
          iaculis felis, in tempus nibh libero sed velit.
        </p>
      </section>
      <section className="header__aside">
        <Wave className="header__image" />
      </section>
    </header>
  );
};
