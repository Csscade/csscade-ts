import { Logo } from "@/ui/components/atoms/Images/Logo";
import { ToggleTheme } from "@/ui/components/molecules/ToggleTheme/ToggleTheme";
import "./Navigation.css";

export const Navigation = () => {
  return (
    <section className="navigation">
      <div className="container">
        <Logo />
        <nav className="nav">
          <ul>
            <li>Articles</li>
            <li>Astuces</li>
            <li>À propos</li>
          </ul>
          <ToggleTheme />
        </nav>
      </div>
    </section>
  );
};
