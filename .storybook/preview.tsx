import type { Preview } from "@storybook/nextjs-vite";
import { Fira_Code, Playfair_Display, Poppins } from "next/font/google";

import "@/ui/styles/theme.css";

const primaryFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const secondaryFont = Playfair_Display({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

const monospaceFont = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Clair" },
          { value: "dark", title: "Sombre" },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      const html = document.querySelector("html");
      if (html) {
        html.setAttribute("data-theme", theme);
        html.classList.add(
          primaryFont.className,
          secondaryFont.className,
          monospaceFont.variable,
        );
      }

      return (
        <div
          data-theme={theme}
          className={`${primaryFont.className} ${secondaryFont.className} ${monospaceFont.variable}`}
          style={{ minHeight: "100%", padding: "1rem" }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
