import { clsx } from "clsx";
import type { Metadata } from "next";
import { Fira_Code, Playfair_Display, Poppins } from "next/font/google";
import "@/ui-kit/styles/theme.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type React from "react";
import { Footer } from "@/ui-kit/components/templates/Footer/Footer";
import { Navigation } from "@/ui-kit/components/templates/Navigation/Navigation";
import { getQaScores } from "@/usecases/qa-scores";

config.autoAddCss = false;

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

const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: "Csscade",
  description: "Csscade website",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: `${basePath}/favicons/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicons/favicon.svg`, type: "image/svg+xml" },
    ],
    apple: [
      { url: `${basePath}/favicons/apple-touch-icon.png`, sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const qaScores = getQaScores();

  return (
    <html
      lang="fr"
      className={clsx(
        primaryFont.className,
        secondaryFont.className,
        monospaceFont.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Applied before hydration to avoid a theme flash and to prevent
        the global link color transition from firing on every anchor on mount. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static script constant, no user input involved */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Navigation />
        {children}
        <Footer qaScores={qaScores} />
      </body>
    </html>
  );
}
