import { Wave } from "@/ui/components/atoms/Images/Wave";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header framed-four-corners textured-background">
      <section className="header__main">
        <div className="header__content">
          <h1 className="header__title">CSScade</h1>
          <small>/kskad/</small>
        </div>
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
